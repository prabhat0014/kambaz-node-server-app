import {v4 as uuidv4} from "uuid";
import {QuizzesModel, QuestionsModel, AttemptedModel} from "./model.js";

export default function QuizzesDao() {
    
    const findQuizzesForCourse = async (courseId) => {
        console.log("here in dao courseId: ", courseId);
        const quizzes = await QuizzesModel.find({course: courseId});
        return quizzes;
    }

    const createQuiz = (quiz) => {
        const newQuiz = {...quiz, _id: uuidv4()};
        return QuizzesModel.create(newQuiz);
    }

    const deleteQuiz = async (quizId) => {
        await QuizzesModel.deleteOne({_id: quizId});
        await QuestionsModel.deleteMany({quiz: quizId});
        await AttemptedModel.deleteMany({quiz: quizId});
    }

    const updateQuiz = (quizId, quizUpdates) => {
        return QuizzesModel.updateOne({ _id: quizId }, { $set: quizUpdates });
    }

    const publishQuiz = async (quizId) => {
        const quiz = await QuizzesModel.findById(quizId);
        quiz.published = !quiz.published;
        await quiz.save();
        return quiz;
    };

    const findQuizById = async (quizId) => {
        const quiz = await QuizzesModel.findById(quizId);
    }

    return {
        findQuizzesForCourse,
        createQuiz,
        deleteQuiz,
        updateQuiz,
        publishQuiz,
        findQuizById,
    }
}