import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//============= Fetch All Roles ==========================
export const getRoles = asyncHandler(async (req, res) => {

  const roles = await prisma.role.findMany({
    include: { 
      users:{
        select:{
         id:true,
         name:true,
      }
    }
     },
  });

  if (roles.length === 0) {
    throw new apiError(404, "No roles found");
  }

  return res.status(200).json(new apiResponse(200, roles));
});

//============= Create New Role ==========================
export const createRole = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existing = await prisma.role.findUnique({ where: { name } });

  if (existing) {
    throw new apiError(409, "Role already exists");
  }

  const newRole = await prisma.role.create({ 
    data: { 
       name 
      } 
  });

  return res.status(201).json(new apiResponse(201, "Role created successfully", newRole));
});

//============= Find Single Role ==========================
export const findRole = asyncHandler(async (req, res) => {

  const roleId = Number(req.params.id);
  
  if(isNaN(roleId)) throw new apiError(400, "Invalid role ID");
  
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: { 
      users:{
         select:{
          id:true,
          name:true,
         }
      }
    },
  });

  if (!role) {
    throw new apiError(404, "Role not found");
  }

  return res.status(200).json(new apiResponse(200, role));
});

//============= Edit Role ==========================
export const editRole = asyncHandler(async (req, res) => {

  const roleId = Number(req.params.id);
  
  const { name } = req.body;

  const existing = await prisma.role.findUnique({
     where: { id: roleId } 
    });

  if (!existing) {
    throw new apiError(404, "Role not found");
  }

      const duplicateRole = await prisma.role.findUnique({
      where: { name },
    });

    if (duplicateRole && duplicateRole.id !== roleId) {
      throw new apiError(409, "Role name already exists");
    }

  const updatedRole = await prisma.role.update({
    where: { id: roleId },
    data: { name },
  });

  return res.status(200).json(new apiResponse(200, "Role updated successfully",updatedRole));
});

//============= Delete Role ==========================
export const deleteRole = asyncHandler(async (req, res) => {

  const roleId = Number(req.params.id);

  const existing = await prisma.role.findUnique({ 
    where: { id: roleId } 
  });
  
  if (!existing) {
    throw new apiError(404, "Role not found");
  }

  await prisma.role.delete({ where: { id: roleId } });

  return res.status(204).send();
});
