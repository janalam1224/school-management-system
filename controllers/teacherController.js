import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config.js"

export const getTeachers = asyncHandler(async(req, res) => {

  const teachers = await prisma.teacher.findMany();
  if(teachers.length === 0){
    throw new apiError(404, "No teacher found");
  }
  return res.status(200).json(new apiResponse(200, teachers));
});

export const createTeacher = asyncHandler(async(req, res) => {
  const { name, email } = req.body;
  const existing = await prisma.teacher.findUnique({
    where: { email, }
  });
  if(existing){
    throw new apiError(409, "Teacher already exists");
  }
  const newTeacher = await prisma.teacher.create({
    data:{
      name,
      email,
    }
  });
  
  return res.status(201).json(new apiResponse(201, "Teacher created successfully", newTeacher)); 
});

export const findTeacher = asyncHandler(async(req, res) => {

});

export const editTeacher = asyncHandler(async(req, res) => {
    
});

export const deleteTeacher = asyncHandler(async(req, res) => {
    
});