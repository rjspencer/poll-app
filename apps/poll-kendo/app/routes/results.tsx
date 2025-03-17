import { AppLoadContext } from "@remix-run/cloudflare";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Page } from "../components/page";
import { getQuestionResults } from "../data/questions.server";
import { Chart } from "@components-react";
import { Suspense } from "react";

export const loader = ({ context }: { context: AppLoadContext }) => {
  const responses = getQuestionResults({ context });

  return defer({ responses });
};

export default function Index() {
  const { responses } = useLoaderData<typeof loader>();

  return (
    <Page title="Results">
      <Suspense fallback={<p>Loading options...</p>}>
        <Await resolve={responses}>
          {(responses) => {
            const chartData = responses.map((question) => ({
              id: question.id,
              text: question.text,
              dataLabels: question.options.map((option) => option.text),
              data: question.options.map((option) => {
                return question.responses.filter(
                  (r) => r.optionId === option.id
                ).length;
              }),
            }));

            return (
              <div className="flex flex-col gap-4">
                {chartData.map((question) => (
                  <Chart
                    key={question.id}
                    heading={question.text}
                    dataLabels={question.dataLabels}
                    data={question.data}
                    type="column"
                    style={{ height: "300px" }}
                  />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </Page>
  );
}
