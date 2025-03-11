import { AppLoadContext } from "@remix-run/cloudflare";
import { db } from "../../drizzle/client.server";
import { responses, surveys } from "../../drizzle/schema";

export const responseToDb = (
  response: { id?: string; questionId: string; optionId: string },
  surveyId?: number
) => {
  return {
    id: response.id ? parseInt(response.id) : undefined,
    surveyId,
    questionId: parseInt(response.questionId),
    optionId: parseInt(response.optionId),
  };
};

export const createResponse = async ({
  context,
  submission,
}: {
  context: AppLoadContext;
  submission: Array<{ questionId: string; optionId: string }>;
}) => {
  const client = db((context.cloudflare.env as Env).DB);
  const newSurvey = await client
    .insert(surveys)
    .values({})
    .returning({ id: surveys.id });

  if (!newSurvey) {
    throw new Error("Error creating survey");
  }

  const newResponses = submission.map((r) => responseToDb(r, newSurvey[0].id));

  const result = await client.insert(responses).values(newResponses);

  if (result.error || !result.success) {
    throw new Error("Error creating submission");
  }

  return { success: true };
};
