import prisma from "../config/database.config.js";

const CreateLearningModule = async (learningModule) => {
  const newLearningModule = await prisma.learningModule.create({
    data: learningModule,
  });

  return newLearningModule;
};
const GetLearningModules = async ({ search, limit, offset }) => {
  try {
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const modules = await prisma.learningModule.findMany({
      where,
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.learningModule.count({
      where,
    });

    return { modules, totalCount };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching learning modules");
  }
};

const GetLearningModuleById = async (id) => {
  const learningModule = await prisma.learningModule.findUnique({
    where: { id },
  });

  return learningModule;
};

const UpdateLearningModule = async (id, { title, description, userId }) => {
  try {
    const learningModule = await prisma.learningModule.findUnique({
      where: { id },
    });

    if (!learningModule) {
      throw { status: 404, message: "Learning module not found" };
    }

    if (learningModule.userId !== userId) {
      throw {
        status: 403,
        message: "You are not authorized to update this learning module",
      };
    }

    const updatedLearningModule = await prisma.learningModule.update({
      where: { id },
      data: { title, description, userId },
    });

    return updatedLearningModule;
  } catch (error) {
    throw error;
  }
};

const DeleteLearningModule = async (id) => {
  const deletedLearningModule = await prisma.learningModule.delete({
    where: { id },
  });

  return deletedLearningModule;
};

export {
  CreateLearningModule,
  GetLearningModules,
  GetLearningModuleById,
  UpdateLearningModule,
  DeleteLearningModule,
};
