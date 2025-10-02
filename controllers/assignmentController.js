import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config";

export const getTeacherClassSubjects = asyncHandler(async(req, res) => {

});

export const createTeacherClassSubject = asyncHandler(async(req, res) => {
  const { teacherId, classId, subjectId } = req.body;

    const existing = await prisma.teacherSubjectClass.findUnique({
      where:{ teacherId, subjectId, classId}
    });
      if(existing){
       throw new apiError(409, "Already exists");
      }
      
     const  newTeacherClassSubject = await prisma.teacherSubjectClass.create({
           teacherId,
           classId,
           subjectId,
       }); 
});