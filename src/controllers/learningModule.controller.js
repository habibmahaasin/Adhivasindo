import {
  CreateLearningModule,
  GetLearningModules,
  GetLearningModuleById,
  UpdateLearningModule,
  DeleteLearningModule,
} from "../services/learningModule.services.js";
import { sendResponse, sendError } from "../utils/apiResponse.utils.js";

const createLearningModule = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.userId;

    if (!title || !description || !userId) {
      return sendError(res, 400, "Title, description, and userId are required");
    }

    const newLearningModule = await CreateLearningModule({
      title,
      description,
      userId,
    });

    return sendResponse(
      res,
      201,
      "Learning module created successfully",
      newLearningModule
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Error creating learning module", error);
  }
};

const getLearningModules = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      return sendError(res, 400, "Page and limit must be positive integers");
    }

    const offset = (pageNumber - 1) * limitNumber;
    const { modules, totalCount } = await GetLearningModules({
      search,
      limit: limitNumber,
      offset,
    });
    const totalPages = Math.ceil(totalCount / limitNumber);
    return sendResponse(res, 200, "Learning modules fetched successfully", {
      modules,
      page: pageNumber,
      limit: limitNumber,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Error fetching learning modules", error);
  }
};

const getLearningModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const learningModule = await GetLearningModuleById(id);

    if (!learningModule) {
      return sendError(res, 404, "Learning module not found");
    }

    return sendResponse(
      res,
      200,
      "Learning module fetched successfully",
      learningModule
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Error fetching learning module", error);
  }
};

const updateLearningModule = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user?.userId;

  try {
    const updatedLearningModule = await UpdateLearningModule(id, {
      title,
      description,
      userId,
    });

    return sendResponse(
      res,
      200,
      "Learning module updated successfully",
      updatedLearningModule
    );
  } catch (error) {
    return sendError(
      res,
      error.status || 500,
      error.message || "Error updating learning module",
      error
    );
  }
};

const deleteLearningModule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLearningModule = await DeleteLearningModule(id);

    if (!deletedLearningModule) {
      return sendError(res, 404, "Learning module not found");
    }

    return sendResponse(res, 200, "Learning module deleted successfully");
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Error deleting learning module", error);
  }
};

export {
  createLearningModule,
  getLearningModules,
  getLearningModuleById,
  updateLearningModule,
  deleteLearningModule,
};
