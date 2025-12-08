import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  let { courses, enrollments } = db;
  const findAllCourses = () => courses;
  const findCoursesForEnrolledUser = (userId) => {
    return courses.filter((course) => enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  }
  const createCourse = (course) => {
    const newCourse = {...course, _id: uuidv4()};
    courses = [...courses, newCourse];
    return newCourse;
  }

  const deleteCourse = (courseId) => {
    courses = courses.filter((course) => course._id !== courseId);
    enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
  }

  const updateCourse = (courseId, courseUpdates) => {
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}