import express from 'express';
import prisma from './config/db_config.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

import authRouter from './routes/authRouter.js';
import principalRouter from './routes/principalRouter.js';
import classRouter from './routes/classRouter.js';
import teacherRouter from './routes/teacherRouter.js'
import subjectRouter from './routes/subjectRouter.js';
import studentRouter from './routes/studentRouter.js';
import excelRouter from './routes/excelRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';
import assignmentRouter from './routes/assignmentRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/api/principal", principalRouter);
app.use("/api/classes", classRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/students", studentRouter);
app.use("/api", excelRouter);
app.use("/api", invoiceRouter);
app.use("/api", assignmentRouter);

app.use(errorHandler);

export default app;