import {v4 as uuidv4} from "uuid";

export default function AssignmentsDao(db) {
  let {assignments} = db;

  const findAssignmentsForCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course === courseId);
  }

  const createAssignment = (assignment) => {
    const newAssignment = {...assignment, _id: uuidv4()};
    assignments = [...assignments, newAssignment];
    return newAssignment;
  }

  const deleteAssignment = (assignmentId) => {
    assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  }

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment
  };
}