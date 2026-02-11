import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import connectDB from './config/db.js'; // <--- Import the connection function
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// Connect to Database
connectDB(); // <--- Call the function

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});