import prisma from "../config/db_config.js"
import bcrypt from 'bcrypt';
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//============= Fetch All Users ==========================
export const getUsers = asyncHandler(async(req, res) => {
  const users = await prisma.user.findMany();
  if(users.length === 0){
    throw new apiError(404, "No user found");
  }
  return res.status(200).json(new apiResponse(200, users ));
});

//============= Create New User ==========================
export const createUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({
      where: { email }
    });
    if(existing){
      throw new apiError(409, "User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 12); 
    const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password:hashPassword,
      }
    });
    return res.status(201).json(new apiResponse(201,"User created successfully", newUser));
});

//============= Find Single User ==========================
export const findUser = asyncHandler(async(req, res) => {

  const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId}
    });
    if(!user){
      throw new apiError(404, "User not found");
    }
    return res.status(200).json(new apiResponse(200, user));
});

//============= Edit User ==========================
export const editUser = asyncHandler(async(req, res) => {

  const userId = Number(req.params.id);

  const { name, email, password } = req.body;
  
    const existing = await prisma.user.findUnique({
      where: { id: userId}
    });
    if(!existing){
      throw new apiError(404, "User not found");
    }
     
    const hashPassword = await bcrypt.hash(password, 12);

    const updateUser = await prisma.user.update({
      where: { id: userId},
      data:{
        name,
        email,
        password:hashPassword,
      }
    });

    return res.status(200).json(new apiResponse(200,"User updated successfully"));
});

//============= Delete User ==========================
export const deleteUser = asyncHandler(async(req, res) => {

  const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId}
    });
    if(!user){
      throw new apiError(404, "User not found");
    }
    
      await prisma.user.delete({ where: { id: userId }});

    return res.status(204).send();
});