import {
  CreateLearningModule,
  GetLearningModules,
  GetLearningModuleById,
  UpdateLearningModule,
  DeleteLearningModule,
} from "../services/learningModule.services.js";

const createLearningModule = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res
        .status(400)
        .json({ message: "Title, description, and userId are required" });
    }

    const newLearningModule = await CreateLearningModule({
      title,
      description,
      userId,
    });

    res.status(201).json(newLearningModule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating learning module" });
  }
};

const getLearningModules = async (req, res) => {
  try {
    const learningModules = await GetLearningModules();
    res.status(200).json(learningModules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching learning modules" });
  }
};

const getLearningModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const learningModule = await GetLearningModuleById(id);

    if (!learningModule) {
      return res.status(404).json({ message: "Learning module not found" });
    }

    res.status(200).json(learningModule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching learning module" });
  }
};

const updateLearningModule = async (req, res) => {
  const { id } = req.params;
  const { title, description, userId } = req.body;

  try {
    const updatedLearningModule = await UpdateLearningModule(id, {
      title,
      description,
      userId,
    });

    if (!updatedLearningModule) {
      return res.status(404).json({ message: "Learning module not found" });
    }

    res.status(200).json(updatedLearningModule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating learning module" });
  }
};

const deleteLearningModule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLearningModule = await DeleteLearningModule(id);

    if (!deletedLearningModule) {
      return res.status(404).json({ message: "Learning module not found" });
    }

    res.status(200).json({ message: "Learning module deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting learning module" });
  }
};

export {
  createLearningModule,
  getLearningModules,
  getLearningModuleById,
  updateLearningModule,
  deleteLearningModule,
};
