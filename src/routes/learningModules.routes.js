import {
  createLearningModule,
  deleteLearningModule,
  getLearningModuleById,
  getLearningModules,
  updateLearningModule,
} from "../controllers/learningModule.controller.js";
import express from "express";

const learningModuleRoutes = express.Router();
learningModuleRoutes.post("/", createLearningModule);
learningModuleRoutes.get("/", getLearningModules);
learningModuleRoutes.get("/:id", getLearningModuleById);
learningModuleRoutes.put("/:id", updateLearningModule);
learningModuleRoutes.delete("/:id", deleteLearningModule);

export default learningModuleRoutes;
