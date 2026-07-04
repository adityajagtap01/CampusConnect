import { Router } from "express";
import { authenticate } from "../middleware/authmiddleware.js";
import { applytoteams, create_company, get_all_applicants_related_to_team, getcommpnies } from "../controller/company.contorller.js";
const router = Router();
router.get("/allteams", authenticate, getcommpnies)
import { isAdmin } from "../middleware/isAdmin.js";
// ...
router.post("/postateam", authenticate, isAdmin, create_company)
router.post("/applytoteam", authenticate, applytoteams)
router.get("/getapplicants/:teamid", authenticate, get_all_applicants_related_to_team)
export default router