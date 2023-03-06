import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27000/dojo-wall';
mongoose.connect(DB_URI);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port`);
});
