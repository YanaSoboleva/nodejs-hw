import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import "dotenv/config";

const app = express(); //створення сервера

const logger = pino({
  transport: process.env.NODE_ENV !== "production" 
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "SYS:standard",
        },
      } 
    : undefined, // У продакшн використовуємо стандартний швидкий JSON формат
});

app.use(logger);
app.use(cors()); //дозволяє робити запити до інших доменів
app.use(helmet()); //робить захист бекенда на стандартному рівні
app.use(express.json()); //дозволяє обробляти данні у форматі JSON, що надходять у body запит

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

app.get("/notes", (req, res) => {
    res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
    const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
    const isProd = process.env.NODE_ENV === "production";
    req.log.error(err);
    res.status(500).json({
    message: isProd ? "Server error" : err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});

