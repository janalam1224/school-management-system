import express from 'express';

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to school-management-system");
});

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});