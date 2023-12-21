import { Router } from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController";
const router = Router();

router.route("/").get(getAllMessages).post(sendMessage);

export default router;
