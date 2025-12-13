import mongoose from "mongoose";
const quizzesSchema = new mongoose.Schema({
    title: String,
    course: { type: String, ref: "CourseModel" },
    quizType: String,
    points: Number,
    assignmentGroup: String,
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: Number,
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: Number,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtTime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    untilDate: String,
    published: { type: Boolean, default: false },
    description: String,
    },
    { collection: "quizzes" }
);
export default quizzesSchema;