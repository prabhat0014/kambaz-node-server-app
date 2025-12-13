import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
    const dao = QuizzesDao();

    const findQuizzesForCourse = async (req, res) => {
        const {courseId} = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    }

    const createQuizForCourse = async (req, res) => {
        const {courseId} = req.params;
        const quiz = {
            ...req.body,
            course: courseId,
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.json(newQuiz);
    }

    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.send(status);
    }

    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    }

    const findQuizById = async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
    }

    const publishQuiz = async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.publishQuiz(quizId);
        res.json(quiz);
    }

    const findQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        res.json(questions);
    }

    const createQuestion = async (req, res)  => {
        const { quizId } = req.params;
        const question = { ...req.body, quiz: quizId };
        const newQuestion = await dao.createQuestion(question);
        res.json(newQuestion);
    }

    const updateQuestion = (req, res) => {
        const { questionId } = req.params;
        const { questionChanges } = req.body;
        const status = dao.updateQuestion(questionId, questionChanges);
        res.json(status);
    }

    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        await dao.deleteQuestion(questionId);
        res.sendStatus(204);
    }

    const findAttemptsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const attempts = await dao.findAttemptsForQuiz(quizId, currentUser._id);
        res.json(attempts);
    }

    const createAttempt = async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
        return;
        }
        const attempt = { ...req.body, quiz: quizId, user: currentUser._id };
        const newAttempt = await dao.createAttempt(attempt);
        res.json(newAttempt);
    }

    const findLatestAttempt = async (req, res) => {
        const { quizId } = req.params;
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const attempt = await dao.findLatestAttempt(quizId, currentUser._id);
        if (attempt) {
            res.json(attempt);
        } else {
            res.sendStatus(404);
        }
    }

    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.put("/api/quizzes/:quizId/publish", publishQuiz);
    app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
    app.post("/api/quizzes/:quizId/questions", createQuestion);
    app.put("/api/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);
    app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuiz);
    app.post("/api/quizzes/:quizId/attempts", createAttempt);
    app.get("/api/quizzes/:quizId/attempts/latest", findLatestAttempt);
};