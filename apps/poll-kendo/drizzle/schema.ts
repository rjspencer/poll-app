import { relations } from "drizzle-orm/relations";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  updated_at: text("updated_at"),
  created_at: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  deleted_at: text("deleted_at"),
};

export const questions = sqliteTable("questions", {
  id: integer().primaryKey(),
  text: text().notNull(),
  type: text(),
  ...timestamps,
});

export const questionsRelations = relations(questions, ({ many }) => ({
  options: many(options),
  responses: many(responses),
}));

export const options = sqliteTable("options", {
  id: integer().primaryKey(),
  questionId: integer().references(() => questions.id, { onDelete: "cascade" }),
  text: text().notNull(),
  ...timestamps,
});

export const optionsRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id],
  }),
}));

export const surveys = sqliteTable("surveys", {
  id: integer().primaryKey(),
  ...timestamps,
});

export const responses = sqliteTable("responses", {
  id: integer().primaryKey(),
  surveyId: integer().references(() => surveys.id, { onDelete: "cascade" }),
  optionId: integer().references(() => options.id, { onDelete: "cascade" }),
  questionId: integer().references(() => questions.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const responsesRelations = relations(responses, ({ one }) => ({
  question: one(questions, {
    fields: [responses.questionId],
    references: [questions.id],
  }),
  option: one(options, {
    fields: [responses.optionId],
    references: [options.id],
  }),
}));
