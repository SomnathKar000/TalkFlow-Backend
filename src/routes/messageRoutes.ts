import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
  getConversation,
} from "../controllers/messageController";
import {
  newMessageValidator,
  validationErrorHandler,
} from "../middleware/validators";

const router = Router();

router.route("/").get(getAllMessages);
router
  .route("/:conversationId")
  .post(newMessageValidator, validationErrorHandler, sendMessage)
  .get(getConversation);

export default router;
