// Initilize express router
import { Router } from "express";
import {protect} from '../../middleware/auth.js';

// Import CRUD controller
import {
  createUser,
  getAuthUser,
  updateStudentInfo,
  updateFacultyInfo,
  delUserWithPass,
} from "../../controllers/user/curd.controller.js";

const router = Router();

// affter sucessful login, user can update his/her profile
// also need user to refresh their page to get updated data
router.put("/", createUser);

// auth.protect, via middleware
router.get("/", protect,getAuthUser);

router.put("/up/stu",protect, updateStudentInfo);

router.put("/up.fac",protect, updateFacultyInfo);

router.delete("/",protect, delUserWithPass);

export default router;
