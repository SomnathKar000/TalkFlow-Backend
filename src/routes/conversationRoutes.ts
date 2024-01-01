import { Router } from "express";
import {
  createConversation,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/conversationController";

import {
  addOrRemoveFromGroupValidator,
  validationErrorHandler,
  createGroupChatValidator,
  renameGroupChatValidator,
  createConversationValidator,
} from "../middleware/validators";

const router = Router();

router
  .route("/")
  .post(
    createConversationValidator,
    validationErrorHandler,
    createConversation
  );
router
  .route("/group")
  .post(createGroupChatValidator, validationErrorHandler, createGroupChat);
router
  .route("/rename")
  .put(renameGroupChatValidator, validationErrorHandler, renameGroupChat);
router
  .route("/add/:conversationId")
  .put(addOrRemoveFromGroupValidator, validationErrorHandler, addToGroup);
router
  .route("/remove/:conversationId")
  .put(addOrRemoveFromGroupValidator, validationErrorHandler, removeFromGroup);

export default router;
