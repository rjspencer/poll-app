import {
  ActionFunctionArgs,
  AppLoadContext,
  defer,
  redirect,
} from "@remix-run/cloudflare";
import { Page } from "../components/page";
import { EditQuestionForm } from "../components/editQuestionForm";
import { createOrEditQuestion, getQuestion } from "../data/questions.server";
import { Await, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { DeleteQuestionForm } from "../components/deleteQuestionForm";
import { isAdmin } from "../data/admin.server";
import { Suspense } from "react";

type Params = {
  id: string;
  key: string;
};

export const loader = async ({
  context,
  params,
}: {
  context: AppLoadContext;
  params: Params;
}) => {
  if (isAdmin(context, params.key)) {
    return redirect("/");
  }

  if (params.id === "new") {
    return defer({ question: null });
  }

  const questionQuery = getQuestion({ context, id: params.id });

  return defer({
    question: questionQuery,
  });
};

export async function action({ context, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const data = [...body.entries()].map(([key, value]) => ({
    key,
    value: value.toString(),
  }));

  const questionId = data.find((item) => item.key === "question-id")?.value;
  invariant(questionId, "Question ID is required");

  const questionField = data.find((item) => item.key === "question");
  const answerFields = data
    .filter((item) => item.key.includes("answer"))
    .map((item) => {
      const [, id] = item.key.split("-");
      return {
        id: id === "new" ? undefined : id,
        text: item.value,
      };
    });

  if (questionField?.value && answerFields.length > 0 && answerFields[0].text) {
    const newQuestion =
      questionId === "new"
        ? {
            text: questionField.value,
            options: answerFields,
          }
        : {
            id: questionId,
            text: questionField.value,
            options: answerFields,
          };
    await createOrEditQuestion({ context, question: newQuestion });
  }

  return redirect("/");
}

export default function Admin() {
  const { question } = useLoaderData<typeof loader>();

  return (
    <Page title="Admin">
      <Suspense>
        <Await resolve={question}>
          {(question) => (
            <>
              <EditQuestionForm question={question ?? undefined} />
              {question?.id && <DeleteQuestionForm questionId={question?.id} />}
            </>
          )}
        </Await>
      </Suspense>
    </Page>
  );
}
