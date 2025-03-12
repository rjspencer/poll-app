import { AppLoadContext } from "@remix-run/cloudflare";
import { db } from "../../drizzle/client.server";
import { options, questions } from "../../drizzle/schema";
import {
  Env,
  isOption,
  NewOption,
  NewQuestion,
  Option,
  Question,
} from "../types";
import { idToDb } from "./utils";
import { and, eq, notInArray, sql } from "drizzle-orm";

export const optionToDb = (option: Option | NewOption) => {
  return idToDb(option);
};

export const questionToDb = (question: Question | NewQuestion) => {
  const { options, ...questionData } = question;
  return {
    ...idToDb(questionData),
    options: options.map(optionToDb),
  };
};

const isQuestionType = (
  type: string | null | undefined
): type is Question["type"] => {
  if (
    type === "dropdown" ||
    type === "radio" ||
    type === "checkbox" ||
    type === null ||
    type === undefined
  ) {
    return true;
  }
  return false;
};

export const getQuestion = async ({
  context,
  id,
}: {
  context: AppLoadContext;
  id: string;
}): Promise<Question | undefined> => {
  const client = db((context.cloudflare.env as Env).DB);
  const response = await client.query.questions.findFirst({
    where: eq(questions.id, parseInt(id)),
    with: {
      options: true,
    },
  });
  if (!response) {
    return undefined;
  }
  return {
    ...response,
    id: response.id.toString(),
    type: isQuestionType(response.type) ? response.type : undefined,
    options: response.options.map((option) => ({
      ...option,
      id: option.id.toString(),
    })),
  };
};

export const getQuestions = async ({
  context,
}: {
  context: AppLoadContext;
}): Promise<Question[]> => {
  const client = db((context.cloudflare.env as Env).DB);
  const response = await client.query.questions.findMany({
    with: {
      options: true,
    },
  });
  return response.map((question) => ({
    ...question,
    id: question.id.toString(),
    type: isQuestionType(question.type) ? question.type : undefined,
    options: question.options.map((option) => ({
      ...option,
      id: option.id.toString(),
    })),
  }));
};

export const getQuestionResults = async ({
  context,
}: {
  context: AppLoadContext;
}) => {
  const client = db((context.cloudflare.env as Env).DB);
  return await client.query.questions.findMany({
    with: {
      options: true,
      responses: true,
    },
  });
};

export const deleteQuestion = async ({
  context,
  id,
}: {
  context: AppLoadContext;
  id: string;
}) => {
  const client = db((context.cloudflare.env as Env).DB);
  return await client
    .delete(questions)
    .where(eq(questions.id, parseInt(id)))
    .limit(1);
};

export const createOrEditQuestion = async ({
  context,
  question,
}: {
  context: AppLoadContext;
  question: Question | NewQuestion;
}) => {
  const client = db((context.cloudflare.env as Env).DB);
  const { options: optionsData, ...questionData } = questionToDb(question);
  const [updatedQuestion] = await client
    .insert(questions)
    .values(questionData)
    .onConflictDoUpdate({ target: questions.id, set: questionData })
    .returning({ id: questions.id });

  if (!updatedQuestion?.id) {
    throw new Error("Error writing question");
  }

  const newOptions = await client
    .insert(options)
    .values(
      optionsData
        .filter((a) => !a.deleted)
        .map((option) => ({
          ...option,
          id: isOption(option) ? parseInt(option.id) : undefined,
          questionId: updatedQuestion.id,
        }))
    )
    .onConflictDoUpdate({
      target: options.id,
      set: { text: sql`excluded.text` },
    })
    .returning({ id: options.id });

  const deleteOptions = await client.delete(options).where(
    and(
      eq(options.questionId, updatedQuestion.id),
      notInArray(
        options.id,
        newOptions.map((option) => option.id)
      )
    )
  );

  if (deleteOptions.error || !deleteOptions.success) {
    throw new Error("Error deleting options");
  } else {
    console.log("Deleted options", deleteOptions);
  }

  return { success: true };
};
