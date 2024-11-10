/*eslint-disable*/
import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import { handlers } from "./handlers";

const app = express();
const port = 9090;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://host.docker.internal:3000",
      "http://0.0.0.0:3000",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(createMiddleware(...handlers));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler - 타입 수정
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(errorHandler);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Mock server is running at http://0.0.0.0:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
