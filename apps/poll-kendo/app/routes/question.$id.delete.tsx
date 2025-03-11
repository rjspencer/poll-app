import {
  ActionFunctionArgs,
  AppLoadContext,
  redirect,
} from "@remix-run/cloudflare";
import { deleteQuestion } from "../data/questions.server";
import invariant from "tiny-invariant";

type Params = {
  id: string;
};
export const loader = async ({
  params,
}: {
  context: AppLoadContext;
  params: Params;
}) => {
  return redirect(`/question/${params.id}`);
};

export async function action({ context, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const data = [...body.entries()].map(([key, value]) => ({
    key,
    value: value.toString(),
  }));

  const questionId = data.find((item) => item.key === "question-id")?.value;
  invariant(questionId, "Question ID is required");

  await deleteQuestion({ context, id: questionId });

  return redirect("/");
}
