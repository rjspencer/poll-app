import { AppLoadContext } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Page } from "../components/page";
import { getQuestionResults } from "../data/questions.server";

export const loader = async ({ context }: { context: AppLoadContext }) => {
  const responsesQuery = await getQuestionResults({ context });

  return { responses: responsesQuery };
};

export default function Index() {
  const { responses } = useLoaderData<typeof loader>();

  return (
    <Page title="Results">
      <div className="flex flex-col gap-4">
        {responses.map((question) => {
          return (
            <div key={question.id}>
              <h2>{question.text}</h2>
              <ul>
                {question.options.map((option) => (
                  <li key={option.id}>
                    {option.text} -{" "}
                    {
                      question.responses.filter(
                        (r) =>
                          r.questionId === question.id &&
                          r.optionId === option.id
                      ).length
                    }
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
