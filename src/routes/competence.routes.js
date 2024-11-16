import express from "express";
import {
  createCompetenceHandler,
  getAllCompetencesHandler,
  getCompetenceByIdHandler,
  updateCompetenceHandler,
  deleteCompetenceHandler,
} from "../controllers/competence.controller.js";

const competenceRoutes = express.Router();

competenceRoutes.post("/", createCompetenceHandler);
competenceRoutes.get("/", getAllCompetencesHandler);
competenceRoutes.get("/:id", getCompetenceByIdHandler);
competenceRoutes.put("/:id", updateCompetenceHandler);
competenceRoutes.delete("/:id", deleteCompetenceHandler);

export default competenceRoutes;
