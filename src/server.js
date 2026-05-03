import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const app = express(); //створення сервера

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
  res.status(200).json({ message: "Retrieved note with ID: id_param" });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res.status(500).json({
    message: isProd ? "Simulated server error" : err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});

