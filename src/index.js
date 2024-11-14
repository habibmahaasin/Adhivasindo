import express from "express";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/errorHandler.middlewares.js";
import morgan from "morgan";
import cors from "cors";
import { corsOptions } from "./utils/cors.utlis.js";
import learningModuleRoutes from "./routes/learningModules.routes.js";

const app = express();
app.use(cors(corsOptions));

app.use(morgan("combined"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("api/v1/learning-modules", learningModuleRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
