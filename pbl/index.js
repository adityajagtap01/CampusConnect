import 'dotenv/config';
import express from 'express'
import checkrouter from './router/checking.router.js';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import currentstudentrouter from './router/currentstudent.route.js';
import teamrouter from './router/tnp.routes.js'
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
cloudinary.config({
  cloud_name: 'deohargvg',
  api_key: '396292643313639',
  api_secret: 'AMFsCzBRV979ibtMZyyPO8vBU80'
})
app.use("/api/v1/auth", currentstudentrouter)
app.use("/api/v1/checking", checkrouter);
app.use("/api/v1/team", teamrouter);
app.listen(3000)