import {v4 as uuidv4} from "uuid";
import {QuizzesModel, QuestionsModel, AttemptedModel} from "./model.js";

export default function QuizzesDao() {
    
    const findQuizzesForCourse = async (courseId) => {
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
        return quiz;
    }

    const findQuestionsForQuiz = async (quizId) => {
        const questions = await QuestionsModel.find({ quiz: quizId });
        return questions
    }

    const createQuestion = (question) => {
        delete question._id;
        return QuestionsModel.create(newQuestion);
    };

    const deleteQuestion = async (questionId) => {
        await QuestionsModel.deleteOne({ _id: questionId });
    }

    const updateQuestion = (questionId, questionUpdates) => {
        QuestionsModel.updateOne({ _id: questionId }, { $set: questionUpdates });
    }

    const findAttemptsForQuiz = async (quizId, userId) => {
        const attempts = await AttemptedModel.find({ quiz: quizId, user: userId });
        return attempts;
    }

    const createAttempt = (attempt) => {
        delete attempt._id;
        return AttemptedModel.create(attempt);
    };

    const findLatestAttempt = async (quizId, userId) => {
        const attempts = await AttemptedModel.find({ quiz: quizId, user: userId }).sort({ attempt: -1 }).limit(1);
        return attempts[0];
    };

    return {
        findQuizzesForCourse,
        createQuiz,
        deleteQuiz,
        updateQuiz,
        publishQuiz,
        findQuizById,
        findQuestionsForQuiz,
        createQuestion,
        deleteQuestion,
        updateQuestion,
        findAttemptsForQuiz,
        createAttempt,
        findLatestAttempt,
    }
}