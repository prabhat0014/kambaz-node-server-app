import mongoose from "mongoose";

const attemptedSchema = new mongoose.Schema({
    quiz: { type: String, ref: "QuizzesModel" },
    user: { type: String, ref: "UserModel" },
    attempt: Number,
    score: Number,
    answers: [
        {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        earnedPoints: Number,
        }
    ],
    submittedAt: { type: Date, default: Date.now },
    },
    { collection: "quizAttempts" }
);

export default attemptedSchema;