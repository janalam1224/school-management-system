import express from 'express';
import prisma from './config/db_config.js';
import authRouter from './routes/authRouter.js';

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});