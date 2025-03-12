import { Form, useNavigation } from "@remix-run/react";
import { FC, useState } from "react";
import Input from "./input";
import { Question } from "../types";
// import Button from "@components-react";
import {Button} from "@components-react";

const emptyQuestion: Question = {
  id: "",
  text: "",
  options: [],
};

type EditQuestionFormProps = {
  question?: Question;
};

export const EditQuestionForm: FC<EditQuestionFormProps> = ({
  question = emptyQuestion,
}) => {
  const navigation = useNavigation();
  const [newOptions, setNewOptions] = useState<string[]>([]);
  const [removedAnswers, setRemovedAnswers] = useState<string[]>([]);

  return (
    <Form method="post" action={`/question/${question.id}`}>
      {navigation.state === "submitting" && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p>Creating question...</p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        <h2 className="font-semibold text-lg">Edit Question</h2>
        <div className="flex flex-col gap-8">
          <input type="hidden" name="question-id" value={question.id} />
          <fieldset className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Input
                label="Question"
                name={`question`}
                defaultValue={question.text}
              />
              {question.options.map((option, idx) => (
                <div key={option.id} className="flex flex-row gap-2 pl-8">
                  <Input
                    label={`Answer #${idx + 1}`}
                    name={`answer-${option.id}${
                      removedAnswers.includes(option.id) ? "-delete" : ""
                    }`}
                    defaultValue={option.text}
                    disabled={removedAnswers.includes(option.id)}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      removedAnswers.includes(option.id)
                        ? setRemovedAnswers((prev) =>
                            prev.filter((id) => id !== option.id)
                          )
                        : setRemovedAnswers((prev) => [...prev, option.id])
                    }
                    title={
                      removedAnswers.includes(option.id) ? "Restore" : "Remove"
                    }
                  >
                    {removedAnswers.includes(option.id) ? "+" : "-"}{" "}
                    <span className="sr-only">
                      {removedAnswers.includes(option.id)
                        ? "Restore"
                        : "Remove"}{" "}
                      Answer
                    </span>
                  </Button>
                </div>
              ))}
              {newOptions.map((id, idx) => (
                <div key={id} className="flex flex-row gap-2 pl-8">
                  <Input
                    label={`Answer #${idx + 1}`}
                    name={`answer-new-${idx}`}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setNewOptions((prev) => prev.filter((i) => i !== id))
                    }
                    title="Remove"
                  >
                    - <span className="sr-only">Remove Answer</span>
                  </Button>
                </div>
              ))}
            </div>
            <div className="pl-8">
              <Button
                type="button"
                onClick={() =>
                  setNewOptions((prev) => [
                    ...prev,
                    Math.floor(Math.random() * 100000).toString(),
                  ])
                }
              >
                + Add Answer
              </Button>
            </div>
          </fieldset>
        </div>

        <div className="my-8">
          <Button type="submit">{question.id ? "Update" : "Create"}</Button>
        </div>
      </div>
    </Form>
  );
};
