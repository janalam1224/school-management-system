import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  const { name, startDate, endDate } = req.body;

  const parsedStartDate = new Date(startDate);

  const parsedEndDate = new Date(endDate);

  const existing = await prisma.academicSession.findUnique({
    where: { name },
  });

  if (existing) {
    throw new apiError(409, "Session with this name already exists");
  }

  const newSession = await prisma.academicSession.create({
    data: {
      name,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
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
export const editSession = asyncHandler(async(req, res) => {

  const sessionId = Number(req.params.id);

  if(isNaN(sessionId)) throw new apiError(400, "Invalid session ID");

  const { name, startDate, endDate } = req.body;

  const parsedStartDate = startDate ? new Date(startDate) : null;

  const parsedEndDate = endDate ? new Date(endDate) : null;

  const session = await prisma.academicSession.findUnique({
    where:{ id: sessionId }
  });
   
  if(!session){
    throw new apiError(404, "Session not found");
  }

  const updateSession = await prisma.academicSession.update({
    where:{ id: sessionId },
    data:{
        name,
        startDate:parsedStartDate,
        endDate:parsedEndDate,
    }
  });

  return res.status(200).json(new apiResponse(200, "Session updated successfully", updateSession));
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