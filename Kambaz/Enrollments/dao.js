import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  let {enrollments} = db;
  function enrollUserInCourse(userId, courseId) {
    const existing = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (!existing) {
      enrollments = [
        ...enrollments,
        { _id: uuidv4(), user: userId, course: courseId },
      ];
    }
  }

  function unenrollUserFromCourse(userId, courseId) {
    enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}