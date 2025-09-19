import prisma from "../config/db_config.js"
import bcrypt from 'bcrypt';

export const getUsers = async(req, res) => {
 try {
  const users = await prisma.principal.findMany();
  if(users.length === 0){
    return res.status(404).json({ message:"No user found" });
  }
  return res.status(200).json({ users });
 } catch (error) {
  console.log("Error while fetching users", error);
  res.status(500).json({ message: "Internal server error" });
 }
}

export const createUser = async(req, res) => {
  const { name, email, password } = req.body;
  try {
    const principal = await prisma.principal.findUnique({
      where: { email }
    });
    if(principal){
      return res.status(409).json({ message: "Principal already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12); 
    const newPrincipal = await prisma.principal.create({
      data:{
        name,
        email,
        password:hashPassword,
      }
    });
    return res.status(201).json({ message:"Principal created successfully", newPrincipal });
  } catch (error) {
    console.log("Error while creating new user", error);
    res.status(500).json({ message: "Internal server error"});
  } 
}

export const findUser = async(req, res) => {
  const principalId = Number(req.params.id);
  try {
    const principal = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!principal){
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ principal });
  } catch (error) {
    console.log("Error while finding principal by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const editUser = async(req, res) => {
  const principalId = Number(req.params.id);
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!existing){
      return res.status(404).json({ message: "Principal not found" });
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

    return res.status(200).json({ message: "Principal updated successfully" });

  } catch (error) {
    console.log("Error while updating principal", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteUser = async(req, res) => {
  const principalId = Number(req.params.id);
  try {
    const principal = await prisma.principal.findUnique({
      where: { id: principalId}
    });
    if(!principal){
      return res.status(404).json({ message: "Principal not found" });
    }
    
    const deletePrincipal = await prisma.principal.delete({
      where: { id: principalId }
    });

    return res.status(204).json();

  } catch (error) {
    console.log("Error while deleting principal", error);
    res.status(500).json({ message: "Internal server error" });
  }
}