export interface Env {
  DB: D1Database;
}

export type Option = {
  id: string;
  text: string;
  deleted?: boolean;
};

export const isOption = (option: unknown): option is Option => {
  return (
    typeof option === "object" &&
    option !== null &&
    typeof (option as Option).id === "string" &&
    typeof (option as Option).text === "string"
  );
};

export type NewOption = Omit<Option, "id">;

export type Question = {
  id: string;
  text: string;
  type?: "dropdown" | "radio" | "checkbox" | null;
  options: Option[];
};

export type NewQuestion = Omit<Question, "id" | "options"> & {
  options: NewOption[];
};

export type Response = {
  id: string;
  surveyId?: string;
  questionId: string;
  optionId: string;
};

export type NewResponse = Omit<Response, "id">;
