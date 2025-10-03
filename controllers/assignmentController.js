import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config.js";

export const getAssignment = asyncHandler(async(req, res) => {

});

export const createAssignment = asyncHandler(async(req, res) => {
  const { teacherId, classId, subjectId } = req.body;
   const existing = await prisma.teacherSubjectClass.findUnique({
   where: {
    teacherId_subjectId_classId: {
      teacherId,
      subjectId,
      classId
    }
  }
 });
      
     const  newAssignment = await prisma.teacherSubjectClass.create({
           data:{
           teacherId,
           classId,
           subjectId,
           }
       }); 

       return res.status(201).json(new apiResponse(201, "Assign successfully"));
});