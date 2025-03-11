import { Form } from "@remix-run/react";
import { FC } from "react";
import Button from "./button";

type DeleteQuestionFormProps = {
  questionId: string;
};

export const DeleteQuestionForm: FC<DeleteQuestionFormProps> = ({
  questionId,
}) => {
  return (
    <Form method="post" action={`/question/${questionId}/delete`}>
      <input type="hidden" name="question-id" value={questionId} />
      <div className="my-8">
        <Button type="submit">Delete Permanently</Button>
      </div>
    </Form>
  );
};
