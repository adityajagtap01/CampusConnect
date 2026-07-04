import { Router } from "express";
import { getcompany, getspecificcompany, getStudentsCountByYear, getsuggestiononprompt, studentdata } from "../controller/check.controller.js";
// import { authenticate } from "../middleware/authmiddleware.js";
import { authenticate } from "../middleware/authmiddleware.js";

const checkrouter =Router();

checkrouter.get('/',authenticate,getcompany)
checkrouter.get('/:id',authenticate,getStudentsCountByYear)
checkrouter.get('/studentdata/:id',authenticate,studentdata)
checkrouter.post('/getme/:id',authenticate,getsuggestiononprompt)
checkrouter.get('/company/:id',authenticate,getspecificcompany)
export default checkrouter