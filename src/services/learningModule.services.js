const CreateLearningModule = async (learningModule) => {
  const newLearningModule = await prisma.learningModule.create({
    data: learningModule,
  });

  return newLearningModule;
};

const GetLearningModules = async () => {
  const learningModules = await prisma.learningModule.findMany();

  return learningModules;
};

const GetLearningModuleById = async (id) => {
  const learningModule = await prisma.learningModule.findUnique({
    where: { id },
  });

  return learningModule;
};

const UpdateLearningModule = async (id, learningModule) => {
  const updatedLearningModule = await prisma.learningModule.update({
    where: { id },
    data: learningModule,
  });

  return updatedLearningModule;
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
