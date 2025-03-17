import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Await,
  defer,
  Form,
  Link,
  redirect,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { Suspense } from "react";
import { Page } from "../components/page";
import { PencilIcon } from "../components/pencil.svg";
import { isAdmin } from "../data/admin.server";
import { getQuestions } from "../data/questions.server";
import { createResponse } from "../data/responses.server";
// import Button from "../components/button";
// import { Dropdown } from "../components/dropdown/Dropdown";
// import { Button } from "@progress/kendo-react-buttons";
import { Button, Dropdown } from "@components-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Poll App" },
    {
      name: "description",
      content: "Poll app for the Bitovi + Kendo Design System Webinar",
    },
  ];
};

export const loader = ({ context, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  const questionQuery = getQuestions({ context });
  return defer({
    questions: questionQuery,
    isAdmin: key && isAdmin(context, key),
  });
};

export async function action({ context, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const data = [...body.entries()].map(([key, value]) => ({
    questionId: key,
    optionId: value.toString(),
  }));

  createResponse({ context, submission: data });

  return redirect("/results");
}

export default function Index() {
  const { questions, isAdmin } = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <Page title="Poll Time">
      <Suspense>
        <Await resolve={questions}>
          {(questions) => (
            <Form method="post">
              <div className="flex flex-col gap-12">
                {questions.map((q) => (
                  <div key={q.id} className="flex-1 flex gap-2">
                    <Dropdown
                      name={q.id}
                      label={q.text}
                      options={q.options?.map((option) => ({
                        label: option.text || "",
                        value: option.id,
                      }))}
                    />
                    {isAdmin && (
                      <Link to={`/question/${q.id}${location.search}`}>
                        <PencilIcon height="30px" width="30px" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    )}
                  </div>
                ))}
                <Button type="submit">Submit + View Results</Button>
                <Link to="/results">View results</Link>
              </div>
            </Form>
          )}
        </Await>
      </Suspense>
    </Page>
  );
}
