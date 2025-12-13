import mongoose from "mongoose";
import quizzesSchema from "./quizSchema.js";
import questionsSchema from "./questionsSchema.js";
import attemptedSchema from "./attemptedSchema.js";

export const QuizzesModel = mongoose.model("QuizzesModel", quizzesSchema);
export const QuestionsModel = mongoose.model("QuestionsModel", questionsSchema);
export const AttemptedModel = mongoose.model("AttemptedModel", attemptedSchema);