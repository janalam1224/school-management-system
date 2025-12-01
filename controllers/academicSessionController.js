import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSessionSchema, updateSessionSchema } from "../schemas/schemas.js";

// ======= Get All Sessions =====================
export const getSessions = asyncHandler(async (req, res) => {

  const academicSessions = await prisma.academicSession.findMany();

  if (academicSessions.length === 0) {
    throw new apiError(404, "No sessions found");
  }

  return res.status(200).json(new apiResponse(200, "All sessions data", academicSessions));
});

// ======= Create New Session =====================
export const createSession = asyncHandler(async (req, res) => {

 const validation = createSessionSchema.safeParse(req.body);

 if(!validation.success){
  return res.status(400).json({
    message:"Validation error",
    errors:validation.error.issues,
  });
 }

  const { name, startDate, endDate } = validation.data;

  const existing = await prisma.academicSession.findUnique({
    where: { name },
  });

  if (existing) {
    throw new apiError(409, "Session with this name already exists");
  }

  const newSession = await prisma.academicSession.create({
    data: {
      name,
      startDate,
      endDate,
    },
  });

  return res.status(201).json(new apiResponse(201, "Session created successfully", newSession));
});

// ======= Find Single Session =====================
export const findSession = asyncHandler(async(req, res) => {

  const sessionId = Number(req.params.id);

  if(isNaN(sessionId)) throw new apiError(400, "Invalid session ID");

  const session = await prisma.academicSession.findUnique({
    where:{ id: sessionId }
  });

  if(!session){
    throw new apiError(404, "Session not found");
  }

  return res.status(200).json(new apiResponse(200, "Session data", session));
});

// ======= Edit Session =====================
export const editSession = asyncHandler(async (req, res) => {
  const sessionId = Number(req.params.id);

  if (isNaN(sessionId)) {
    throw new apiError(400, "Invalid session ID");
  }

  const validation = updateSessionSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: validation.error.issues,
    });
  }

  const session = await prisma.academicSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new apiError(404, "Session not found");
  }
  
  // Merge existing + new data (because updateSessionSchema is partial)
  const payload = {
    name: validation.data.name ?? session.name,
    startDate: validation.data.startDate ?? session.startDate,
    endDate: validation.data.endDate ?? session.endDate,
  };

  const parsedStartDate = new Date(payload.startDate);
  const parsedEndDate = new Date(payload.endDate);

  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    throw new apiError(400, "Invalid date format");
  }

  const nameExists = await prisma.academicSession.findFirst({
    where: {
      name: payload.name,
      id: { not: sessionId },
    },
  });

  if (nameExists) {
    throw new apiError(409, "Another session with this name already exists");
  }

  const updatedSession = await prisma.academicSession.update({
    where: { id: sessionId },
    data: {
      name: payload.name,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    },
  });

  return res
    .status(200)
    .json(new apiResponse(200, "Session updated successfully", updatedSession));
});

// ======= Delete Session =====================
export const deleteSession = asyncHandler(async(req, res) => {

  const sessionId = Number(req.params.id);

  if(isNaN(sessionId)) throw new apiError(400, "Invalid session ID");

  const session = await prisma.academicSession.findUnique({
    where:{ id: sessionId }
  });

  if(!session){
    throw new apiError(404, "Session not found");
  }
  
  await prisma.academicSession.delete({
    where:{ id: sessionId }
  });
  return res.status(204).end();
});