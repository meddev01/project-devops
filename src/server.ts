import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/routes";
import { errorHandler } from "./middleware/middleware";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use(errorHandler); // Middleware global d’erreur

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
