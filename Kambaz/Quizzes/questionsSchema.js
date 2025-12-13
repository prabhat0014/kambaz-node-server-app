import mongoose from "mongoose";
const questionsSchema = new mongoose.Schema({
    quiz: { type: String, ref: "QuizzesModel" },
    type: String,
    title: String,
    points: Number,
    question: String,
    choices: [
        {
            text: String,
            isCorrect: Boolean,
        }
    ],
    correctAnswer: String,
    correctAnswers: [String],
    blanks: [
        {
            blankNumber: Number,
            correctAnswers: [String],
        }
    ],
    caseSensitive: { type: Boolean, default: false },
    },
    { collection: "questions" }
);
export default questionsSchema;