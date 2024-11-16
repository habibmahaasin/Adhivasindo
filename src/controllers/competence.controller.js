import {
  getCompetenceById,
  updateCompetence,
  deleteCompetence,
  getAllCompetencesByLearningModule,
  createCompetenceService,
} from "../services/competence.service.js";

const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const sendError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    error: error ? error.message : null,
  });
};

export const createCompetenceHandler = async (req, res) => {
  try {
    const { learningModuleId, name, description } = req.body;
    const userId = req.user?.userId;

    const competence = await createCompetenceService({
      userId,
      learningModuleId,
      name,
      description,
    });

    sendResponse(res, 201, "Competence created successfully", competence);
  } catch (error) {
    sendError(res, 500, "Error creating competence", error);
  }
};

export const getAllCompetencesHandler = async (req, res) => {
  try {
    const {
      learningModuleId,
      search = "",
      limit = 10,
      page = 1,
      include = {},
    } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const offset = (parsedPage - 1) * parsedLimit;

    const { modules, totalCount } = await getAllCompetencesByLearningModule({
      search,
      limit: parsedLimit,
      offset,
      learningModuleId,
      include,
    });

    const totalPages = Math.ceil(totalCount / parsedLimit);

    sendResponse(res, 200, "Competences fetched successfully", {
      modules,
      totalCount,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
    });
  } catch (error) {
    sendError(res, 500, "Error fetching competences", error);
  }
};

export const getCompetenceByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const competence = await getCompetenceById(id);

    if (!competence) {
      return sendError(res, 404, "Competence not found");
    }

    sendResponse(res, 200, "Competence fetched successfully", competence);
  } catch (error) {
    sendError(res, 500, "Error fetching competence", error);
  }
};

export const updateCompetenceHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user?.userId;

    const competence = await updateCompetence(id, {
      userId,
      name,
      description,
    });

    if (!competence) {
      return sendError(res, 404, "Competence not found");
    }

    sendResponse(res, 200, "Competence updated successfully", competence);
  } catch (error) {
    sendError(res, 500, "Error updating competence", error);
  }
};

export const deleteCompetenceHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const deleted = await deleteCompetence(id, userId);

    if (!deleted) {
      return sendError(res, 404, "Competence not found or not owned by user");
    }

    // Return 200 OK with a message confirming deletion
    sendResponse(res, 200, "Competence deleted successfully");
  } catch (error) {
    sendError(res, 500, "Error deleting competence", error);
  }
};
