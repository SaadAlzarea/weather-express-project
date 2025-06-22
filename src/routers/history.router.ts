import { getHistory } from "../controllers/history.controller";
import { Router } from "express";

const router = Router();

router.get("/history", getHistory);

export default router;
