import express from 'express';
import prisma from './config/db_config.js';

const app = express();

const userObject = {
  name: "janalam",
  email:"janalam1224@gmail.com",
  role: "principal",
  password: "123456",
}
app.post("/api/users", async(req, res) => {
  const user = await prisma.user.findUnique({
    where: { email:userObject.email }
  });
  if(user){
    return res.status(409).json({ message: "User already exists" });
  }
  const newUser = await prisma.user.create({
    data:userObject,
  });
  console.log(newUser);
  return res.status(201).json({ message: "User created successfully", newUser });
});

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});