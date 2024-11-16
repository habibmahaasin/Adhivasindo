import prisma from "../config/database.config.js";

export const createCompetenceService = async ({
  userId,
  learningModuleId,
  name,
  description,
}) => {
  const learningModule = await prisma.learningModule.findUnique({
    where: { id: learningModuleId },
  });

  if (!learningModule || learningModule.userId !== userId) {
    throw new Error(
      "You do not have permission to create competence for this learning module"
    );
  }

  const competence = await prisma.competence.create({
    data: {
      userId,
      learningModuleId,
      name,
      description,
    },
  });

  return competence;
};

export const getAllCompetencesByLearningModule = async ({
  search,
  limit,
  offset,
  learningModuleId,
  include,
}) => {
  try {
    const where = {
      learningModuleId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const modules = await prisma.competence.findMany({
      where,
      take: limit,
      skip: offset,
      include,
    });

    const totalCount = await prisma.competence.count({
      where,
    });

    return { modules, totalCount };
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Error fetching competences");
  }
};

export const getCompetenceById = async (id) => {
  return await prisma.competence.findFirst({
    where: {
      id,
    },
  });
};

export const updateCompetence = async (id, data) => {
  const { userId, name, description } = data;

  const competence = await prisma.competence.findUnique({
    where: { id },
  });

  if (!competence) {
    throw new Error("Competence not found");
  }

  if (competence.userId !== userId) {
    throw new Error(
      "You do not have permission to update competence for this learning module"
    );
  }

  return await prisma.competence.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      userId,
    },
  });
};

export const deleteCompetence = async (id, userId) => {
  const competence = await prisma.competence.findUnique({
    where: { id },
  });

  if (!competence) {
    throw new Error("Competence not found");
  }

  if (competence.userId !== userId) {
    throw new Error(
      "You do not have permission to update competence for this learning module"
    );
  }

  return await prisma.competence.delete({
    where: { id },
  });
};
