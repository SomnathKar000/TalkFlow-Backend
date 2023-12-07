import { Router } from "express";
import {
  createUser,
  loginUser,
  updateuser,
  getuser,
} from "../controllers/userController";
import {
  createUserValidator,
  loginValidator,
  validationErrorHandler,
} from "../middleware/validators";

const router = Router();

router
  .route("/")
  .get(getuser)
  .post(createUserValidator, validationErrorHandler, createUser);
router.route("/login").post(loginValidator, validationErrorHandler, loginUser);
router.route("/profile").put(updateuser);

export default router;
