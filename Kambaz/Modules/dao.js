import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  let {modules} = db;

  const findModulesForCourse = async (courseId) => {
    return modules.filter((m) => m.course === courseId);
  }

  const createModule = async (courseId, module) => {
    const newModule = {...module, course: courseId, _id: uuidv4()};
    modules = [...modules, newModule];
    return newModule;
  }

  const deleteModule = async (moduleId) => {
    modules = modules.filter((m) => m._id !== moduleId);
    return true;
  }

  const updateModule = async (moduleId, moduleUpdates) => {
    const module = modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule
  };
}