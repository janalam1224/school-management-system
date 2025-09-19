import prisma from "../config/db_config.js";
import bcrypt from 'bcrypt';

export const signup = async(req, res) => {
  
  const { name, email, password } = req.body;

  try {
     const user = await prisma.user.findUnique({
     where: { email }
  });
  if(user){
    return res.status(409).json({ message: "User already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data:{
      name,
      email,
      password:hashPassword,
    }
  });

  console.log(newUser);
  return res.status(201).json({ message: "User created successfully", newUser }); 
  } catch (error) {
    console.log("Error while signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async(req, res) => {
    const { email , password } = req.body;
     try {
      const user = await prisma.user.findUnique({
       where: { email }
    });

    if(!user){
      return res.status(404).json({ message: "User not registered" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
      return res.status(401).json({ message: "Invalid email or password" });
    }

     return res.status(200).json({ message: `${user.name} Login successful` });

     } catch (error) {
      console.log("Error while login", error);
      res.status(500).json({ message: "Internal server error" });
     }
  }