import express from "express";
import { createResidency, getAllResidencies, getResidency,deleteResidency} from "../controllers/residencyController.js";
import jwtcheck from "../config/auth0Config.js";
const router=express.Router();
router.post("/create",createResidency)
router.get("/allresd",getAllResidencies)
router.get("/:id",getResidency)
router.delete("/delete/:id", deleteResidency);

export{router as residencyRoute}