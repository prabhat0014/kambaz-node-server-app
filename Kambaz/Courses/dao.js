import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao(db) {
  const findAllCourses = () => {
    return model.find();
  };

  const findCoursesForEnrolledUser = async (userId) => {
    let {enrollments} = db;

    const courses = await model.find();
    const enrolledCourses = courses.filter((course) => enrollments.some((enrollment) => enrollment.user == userId && enrollment.course === course._id));
    return enrolledCourses;
  }

  const createCourse = (course) => {
    const newCourse = {...course, _id: uuidv4()};
    return model.create(newCourse);
  }

  const deleteCourse = (courseId) => {
    let {enrollments} = db;
    enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
    return model.deleteOne({_id: courseId});
  }

  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne({_id: courseId}, {$set: courseUpdates});
  }

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}