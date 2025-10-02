import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config.js";

export const getSubjects = asyncHandler(async(req, res) => {

});

export const createSubject = asyncHandler(async(req, res) => {
  const { name, code } = req.body;
    const existing = await prisma.subject.findUnique({
     where: { code,}      
    });
    if(existing){
      throw new apiError(409, "Subject already exists");
    }
    const newSubject = await prisma.subject.create({
      data:{
        name,
        code,
      }
    });

    return res.status(201).json(new apiResponse(201, "Subject created successfully", newSubject)); 
});

export const findSubject = asyncHandler(async(req, res) => {
  
});

export const editSubject = asyncHandler(async(req, res) => {
  
});

export const deleteSubject = asyncHandler(async(req, res) => {
  
});