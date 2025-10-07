import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAttendance = asyncHandler(async(req, res) => {
  const attendances = await prisma.teacherAttendance.findMany();
  if(attendances.length === 0){
    throw new apiError(404, "No attendance found");
  }

   return res.status(200).json(new apiResponse(200, "All teacher Attendances", attendances));

});

export const createAttendance = asyncHandler(async(req, res) => {
   const { status, attendanceDate, teacherSubjectClassId} = req.body;

   const existing = await prisma.teacherAttendance.findFirst({
    where:{ teacherSubjectClassId }
   });

    if(existing){
    throw new apiError(409, "Teacher attendance already exists");
   }

   const teacherSubjectClassExist = await prisma.student.findFirst({
    where:{ id: teacherSubjectClassId }
   });

   if(!teacherSubjectClassExist){
    throw new apiError(404, "TeacherSubjectClass ID not found");
   }

    const parsedAttendance = new Date(attendanceDate);

   const newAttendance = await prisma.teacherAttendance.create({
    data:{
      status,
      attendanceDate: parsedAttendance,
      teacherSubjectClassId,
    }
   });

   return res.status(201).json(new apiResponse(201, "Teacher attendance created successfully", newAttendance));
});