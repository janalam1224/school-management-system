import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ======= Fetch All Exam Subjects =====================
export const getExamSubjects = asyncHandler(async(req, res) => {

  const examSubjects = await prisma.examSubject.findMany();

  if(examSubjects.length === 0){
    throw new apiError(404, "No exam subject found");
  }  

   return res.status(200).json(new apiResponse(200, "Exam subjects list", examSubjects));
});

// ======= Create New Exam Subject =====================
export const createExamSubject = asyncHandler(async(req, res) => {

  const {examId, subjectId, maxMarks, date } = req.body;
  
  const examIdNum = Number(examId);
  const subjectIdNum = Number(subjectId);
  const parsedDate = date ? new Date(date): null;

  const [examExists, subjectExists ] = await Promise.all([
    prisma.exam.findUnique({ where: { id: examIdNum }}),
    prisma.subject.findUnique({ where: { id: subjectIdNum }}),
  ]);

  if(!examExists){
    throw new apiError(404, "Exam not found with this ID");
  }

   if(!subjectExists){
    throw new apiError(404, "Subject not found with this ID");
  }

  const existing = await prisma.examSubject.findUnique({
    where: {
      examId_subjectId:{
        examId:examIdNum,
        subjectId:subjectIdNum,
      }
    },
  });

  
  if(existing){
    throw new apiError(409, "Exam and subject already exists with this IDs");
  }

   const newExamSubject = await prisma.examSubject.create({
    data:{
      examId:examIdNum,
      subjectId:subjectIdNum,
      maxMarks:Number(maxMarks),
      date:parsedDate,
    }
   });

   return res.status(201).json(new apiResponse(201, "Exam and Subject created successfully", newExamSubject));
});

// ======= Find Single Exam Subject =====================
export const findExamSubject = asyncHandler(async(req, res) => {

  const examSubjectId = Number(req.params.id);

  if(isNaN(examSubjectId)) throw new apiError(400, "Invalid examSubject ID");

  const examSubject = await prisma.examSubject.findUnique({
    where:{ id: examSubjectId }
  });

  if(!examSubject){
    throw new apiError(404, "Exam subject not found with this ID");
  }

  return res.status(200).json(new apiResponse(200, "ExamSubject Data", examSubject));
});

// ======= Edit Exam Subject =====================
export const editExamSubject = asyncHandler(async(req, res) => {
   
  const examSubjectId = Number(req.params.id);

  if(isNaN(examSubjectId)) throw new apiError(400, "Invalid examSubject ID");

  const {examId, subjectId, maxMarks, date } = req.body;
  
  const examIdNum = Number(examId);
  const subjectIdNum = Number(subjectId);
  const parsedDate = date ? new Date(date): null;

  const examSubject = await prisma.examSubject.findUnique({
    where:{ id: examSubjectId }
  });

  if(!examSubject){
    throw new apiError(404, "Exam subject not found with this ID");
  }

  const updateExamSub = await prisma.examSubject.update({
    where:{ id: examSubjectId },
    data:{
       examId:examIdNum,
       subjectId:subjectIdNum,
       maxMarks:Number(maxMarks),
       date:parsedDate,       
    }
  });

  return res.status(200).json(new apiResponse(200, "ExamSubject updated successfully", updateExamSub));
});

// ======= Delete Exam Subject =====================
export const deleteExamSubject = asyncHandler(async(req, res) => {

  const examSubjectId = Number(req.params.id);
  if(isNaN(examSubjectId)) throw new apiError(400, "Invalid examSubject ID");

  const examSub = await prisma.examSubject.findUnique({
    where:{ id: examSubjectId }
  });

  if(!examSub){
    throw new apiError(404, "Exam subject not found with this ID");
  }

  await prisma.examSubject.delete({
    where:{ id: examSubjectId }
  });

  return res.status(204).end();
});