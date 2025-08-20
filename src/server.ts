import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cron from "node-cron"
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import contractorRoutes from "./routes/contractorRoutes";
import cookieParser from 'cookie-parser';
import { cronJob } from './utils/cron';

connectDB();
const app = express();
const PORT = process.env.PORT;

cron.schedule("* * * * *", cronJob)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URI,
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/contractor', contractorRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
