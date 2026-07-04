import { Router } from "express";
import upload from "../tempfunct/multer.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { uploadimage, signup, login, logout, getProfile, admin_login, admin_signup } from "../controller/currentstudent.controller.js";

const currentstudentrouter = Router();

currentstudentrouter.post("/admin_signup", admin_signup)
currentstudentrouter.post("/admin_login", admin_login)
currentstudentrouter.post('/upload', authenticate, upload, uploadimage)
currentstudentrouter.post('/signup', signup)
currentstudentrouter.post('/login', login)
currentstudentrouter.get('/getprofile', authenticate, getProfile)
currentstudentrouter.post('/logout', logout)

export default currentstudentrouter