import { Router } from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController";
const router = Router();

router.route("/").get(getAllMessages);
router.route("/:conversationId").post(sendMessage);

export default router;
