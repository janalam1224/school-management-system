import prisma from "../config/db_config.js";
import bcrypt from 'bcrypt';

export const signup = async(req, res) => {
  
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

  console.log(newPrincipal);
  return res.status(201).json({ message: "principal created successfully", newPrincipal }); 
  } catch (error) {
    console.log("Error while signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async(req, res) => {
    const { email , password } = req.body;
     try {
      const principal = await prisma.principal.findUnique({
       where: { email }
    });

    if(!principal){
      return res.status(404).json({ message: "Principal not registered" });
    }

    const checkPassword = await bcrypt.compare(password, principal.password);

    if(!checkPassword){
      return res.status(401).json({ message: "Invalid email or password" });
    }

     return res.status(200).json({ message: "Principal login successfully" });

     } catch (error) {
      console.log("Error while login", error);
      res.status(500).json({ message: "Internal server error" });
     }
  }