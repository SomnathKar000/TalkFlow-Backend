import { Router } from "express";
import {
  createConversation,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/conversationController";

import {
  createUserValidator,
  validationErrorHandler,
} from "../middleware/validators";

const router = Router();

router.route("/").post(createConversation);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroupChat);
router
  .route("/add/:conversationId")
  .put(createUserValidator, validationErrorHandler, addToGroup);
router
  .route("/remove/:conversationId")
  .put(createUserValidator, validationErrorHandler, removeFromGroup);

export default router;
