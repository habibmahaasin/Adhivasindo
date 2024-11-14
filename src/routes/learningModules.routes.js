import {
  createLearningModule,
  deleteLearningModule,
  getLearningModuleById,
  getLearningModules,
  updateLearningModule,
} from "../controllers/learningModule.controller.js";
import express from "express";

const learningModuleRoutes = express.Router();
learningModuleRoutes.post("/learning-modules", createLearningModule);
learningModuleRoutes.get("/learning-modules", getLearningModules);
learningModuleRoutes.get("/learning-modules/:id", getLearningModuleById);
learningModuleRoutes.put("/learning-modules/:id", updateLearningModule);
learningModuleRoutes.delete("/learning-modules/:id", deleteLearningModule);

export default learningModuleRoutes;
