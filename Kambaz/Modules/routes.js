import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  }

  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    if (status) {
      res.send(200);
    } else {
      res.send(404);
    }
  }

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updatedModule = await dao.updateModule(moduleId, moduleUpdates);
    res.json(updatedModule);
  }

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}