import app from './app.js';

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});