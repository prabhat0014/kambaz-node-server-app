import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  let {modules} = db;
  const findModulesForCourse = (courseId) => {
    return modules.filter((module) => module.course === courseId);
  }

  const createModule = (module) => {
    const newModule = {...module, _id: uuidv4()};
    modules = [...modules, newModule];
    return newModule;
  }

  const deleteModule = (moduleId) => {
    modules = modules.filter((module) => module._id !== moduleId);
  }

  const updateModule = (moduleId, moduleUpdates) => {
    const module = modules.find((module) => module._id === moduleId);
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