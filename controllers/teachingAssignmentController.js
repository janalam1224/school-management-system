import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config.js";

// ======= Fetch All teaching Assignments =====================
export const getAssignments = asyncHandler(async(req, res) => {
  
    let page = Number(req.query.page) || 1;
    if(page <= 0) page = 1;
    
    let limit = Number(req.query.limit) || 5;
    if(limit <= 0 || limit > 100){
      limit = 5;
    }
    const skip = (page - 1) * limit;

  const assignments = await prisma.teachingAssignment.findMany({
     skip,
     take:limit,
     include:{
      schoolClass:{
        select:{
          name:true
        }
      },
      teacher:{
        select:{
          name:true,
        }
      },
      subject:{
        select:{
          name:true,
        }
      }
     }
  });
  
    if(assignments.length === 0){
   throw new apiError(404, "No assignment found")
  }

  const totalAssignments = await prisma.teachingAssignment.count();
  const totalPages = Math.ceil( totalAssignments / limit);

   return res.status(200).json(new apiResponse(200, "All teaching assignments", assignments, {
       pagination:{
         page,
         totalAssignments,
         totalPages,
       }
     }));
});

// ======= Create New Teaching Assignment =====================
export const createAssignment = asyncHandler(async(req, res) => {

  const { teacherId, classId, subjectId } = req.body;
   
  const [ teacherExists, classExists, subjectExists ] = await Promise.all([
    prisma.teacher.findUnique({ where: { id: teacherId}}),
    prisma.schoolClass.findUnique({ where: { id: classId}}),
    prisma.subject.findUnique({ where: { id: subjectId}}),
  ]);

  if(!teacherExists){
    throw new apiError(404, `Teacher with ID ${teacherId} not found`);
  }

  if(!classExists){
    throw new apiError(404, `Class with iD ${classId} not found`);
  }

    if(!subjectExists){
    throw new apiError(404, `Subject with iD ${subjectId} not found`);
  }

   const existing = await prisma.teachingAssignment.findUnique({
   where: {
    teacherId_subjectId_classId: {
      teacherId,
      subjectId,
      classId
    }
  }
 });

 if(existing){
  throw new apiError(409, "This assignment is already exists");
 }
      
     const  newAssignment = await prisma.teachingAssignment.create({
           data:{
           teacherId,
           classId,
           subjectId,
           }
       }); 

       return res.status(201).json(new apiResponse(201, "Assign successfully"));
});

// ======= Find Single Assignment =====================
export const findAssignment = asyncHandler(async(req, res) => {

  const assignmentId = Number(req.params.id);
  if(isNaN(assignmentId)) throw new apiError(400, "Invalid assignment ID");

  const assignment = await prisma.teachingAssignment.findUnique({
    where:{id: assignmentId },
    include:{
      teacher:{
        select:{
          name:true,
        }
      },
      schoolClass:{
        select:{
          name:true,
        }
      },
      subject:{
        select:{
          name:true,
        }
      }
    }
  });

  if(!assignment){
    throw new apiError(404, "Teaching assignment not found");
  }

  return res.status(200).json(new apiResponse(200, "Teaching assignment data", assignment));
});

// ======= Edit Assignment =====================
export const editAssignment = asyncHandler(async(req, res) => {

  const { teacherId, classId, subjectId } = req.body;

  const assignmentId = Number(req.params.id);
  if(isNaN(assignmentId)) throw new apiError(400, "Invalid assignment ID");

  const assignment = await prisma.teachingAssignment.findUnique({
    where:{id:assignmentId }
  });

  if(!assignment){
    throw new apiError(404, "Teaching assignment not found");
  }

const existAssignment = await prisma.teachingAssignment.findFirst({
  where:{
      teacherId,
      subjectId,
      classId,
      NOT:{ id: assignmentId},
  }
});

if(existAssignment){
  throw new apiError(409, "Teaching assignment already exists with this ID's");
}

const updateAssignment = await prisma.teachingAssignment.update({
  where:{ id: assignmentId},
  data:{
     teacherId,
     subjectId,
     classId,
  }
});

return res.status(200).json(new apiResponse(200, "Teaching assignment updated successfully", updateAssignment));
});

// ======= Delete Assignment =====================
export const deleteAssignment = asyncHandler(async(req, res) => {

  const assignmentId = Number(req.params.id);
  if(isNaN(assignmentId)) throw new apiError(400, "Invalid assignment ID");

  const assignment = await prisma.teachingAssignment.findUnique({
    where:{ id: assignmentId }
  });

  if(!assignment){
    throw new apiError(404, "Teaching assignment not found");
  }

  await prisma.teachingAssignment.delete({
    where:{ id: assignmentId }
  });

  return res.status(204).send();
});