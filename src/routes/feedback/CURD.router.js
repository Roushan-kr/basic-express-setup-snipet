import { Router } from "express";
import {
  createFeedback,
  getFacFeed,
  getFeedbackById,
  overview,
  deleteFeedback,
} from "../../controllers/feedback/curd.controller.js";
import { protect, authorize } from "../../middleware/auth.js";
const router = Router();

router.post("/", auth, createFeedback);

// need req.query.facid;
router.get("/facfeed", protect, authorize(["admin", "superadmin"]), getFacFeed); // get feedback by faculty id

router.get(
  "/overview",
  protect,
  authorize(["teacher", "admin", "superadmin"]),
  overview,
); // get feedback by faculty id
router.get("/:id", auth, getFeedbackById); // get feedback by feedback id
router.patch("/:id", auth, updateFeedback); // update feedback by feedback id
router.delete("/:id", auth(["admin", "superadmin"]), deleteFeedback);

export default router;
