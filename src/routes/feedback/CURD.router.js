import { Router } from "express";
import {
  createFeedback,
  getFacFeed,
  getFeedbackById,
  overview,
  deleteFeedback,
  updateFeedback,
} from "../../controllers/feedback/curd.constroller.js";
import { protect, authorize } from "../../middleware/auth.js";
const router = Router();

router.post("/",protect, createFeedback);

// need req.query.facid;
router.get("/facfeed", protect, authorize(["admin", "superadmin"]), getFacFeed); // get feedback by faculty id

router.get(
  "/overview",
  protect,
  authorize(["teacher", "admin", "superadmin"]),
  overview,
); // get feedback by faculty id
router.get("/:id", protect, getFeedbackById); // get feedback by feedback id
router.patch("/:id", protect, updateFeedback); // update feedback by feedback id
router.delete("/:id", authorize(["admin", "superadmin"]), deleteFeedback);

export default router;
