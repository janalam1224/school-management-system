import prisma from "../config/db_config.js"
import bcrypt from 'bcrypt';
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async(req, res) => {
  const users = await prisma.principal.findMany();
  if(users.length === 0){
    throw new apiError(404, "No user found");
  }
  return res.status(200).json(new apiResponse(200, users ));
});

export const createUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;

    const existing = await prisma.principal.findUnique({
      where: { email }
    });
    if(existing){
      throw new apiError(409, "Principal already exists");
    }
    const hashPassword = await bcrypt.hash(password, 12); 
    const newPrincipal = await prisma.principal.create({
      data:{
        name,
        email,
        password:hashPassword,
      }
    });
    return res.status(201).json(new apiResponse(201,"Principal created successfully", newPrincipal));
});

export const findUser = asyncHandler(async(req, res) => {
  const principalId = Number(req.params.id);

    const principal = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!principal){
      throw new apiError(404, "User not found");
    }
    return res.status(200).json(new apiResponse(200, principal));
});

export const editUser = asyncHandler(async(req, res) => {
  const principalId = Number(req.params.id);
  const { name, email, password } = req.body;
  
    const existing = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!existing){
      throw new apiError(404, "Principal not found");
    }
     
    const hashPassword = await bcrypt.hash(password, 12);

    const updatePrincipal = await prisma.principal.update({
      where: { id: principalId},
      data:{
        name,
        email,
        password:hashPassword,
      }
    });

    return res.status(200).json(new apiResponse(200,"Principal updated successfully"));
});

export const deleteUser = asyncHandler(async(req, res) => {
  const principalId = Number(req.params.id);

    const principal = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!principal){
      throw new apiError(404, "Principal not found");
    }
    
      await prisma.principal.delete({ where: { id: principalId }});

    return res.status(204).send();
});