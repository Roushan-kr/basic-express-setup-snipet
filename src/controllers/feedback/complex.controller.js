import {asyncHandler} from "../../utils/asyncHandlear.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";
import ApiResponse from "../../utils/ApiResponse.js";
import Feedback from "../../models/feedback/feedback.model.js";

// Function to find feedbacks with a rating above a threshold
const findFeedbacksByRating = asyncHandler(async (req, res, next) => {
  const { ratingType, threshold } = req.query;
  if (!ratingType || !threshold) {
    throw new ApiError(
      400,
      "atlest one of each Rating type and threshold are required to find feedbacks."
    );
  }
  try {
    const validRatings = [
      "knowledgeRating",
      "communicationRating",
      "behaviorRating",
      "sincerityRating",
      "availabilityRating",
      "engagementRating",
      "attendanceRating",
      "wayOfTeachingRating",
      "subjectKnowledgeRating",
      "fairnessRating",
    ];
    if (!validRatings.includes(ratingType)) {
      throw new ApiError(
        400,
        "Invalid rating type. Please provide a valid rating type."
      );
    }

    const feedbacks = await Feedback.find({
      [ratingType]: { $gte: threshold },
    })
      .populate("byUser", "name email")
      .populate("forUser", "name email");

    if (!feedbacks.length) {
      throw new ApiError(404, "No feedbacks found with the given rating.");
    }
    res.status(200).json(new ApiResponse(200, feedbacks));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// Function to find feedbacks within a date range
const findFeedbacksByDateRange = asyncHandler(async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const feedbacks = await Feedback.find({
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate('byUser', 'name email')
          .populate('forUser', 'name email');
        return feedbacks;
      } catch (error) {
        throw new Error(`Error finding feedbacks by date range: ${error.message}`);
      }
});

// Function to find feedbacks with multiple criteria
const findFeedbacksWithCriteria = asyncHandler(async (req, res, next) => {

    const { userId, ratingType, threshold, startDate, endDate } = req.query;
    try {
    //   let query = mongoose.Query;
      let query = {};
      
      if (userId) {
        query.$or = [{ byUser: userId }, { forUser: userId }];
      }
      
      if (ratingType && threshold) {
        const validRatings = ['knowledgeRating', 'communicationRating', 'behaviorRating',
                              'sincerityRating', 'availabilityRating', 'engagementRating',
                              'attendanceRating', 'wayOfTeachingRating', 'subjectKnowledgeRating',
                              'fairnessRating'];
        if (!validRatings.includes(ratingType)) {
          throw new ApiError(400, 'Invalid rating type. Please provide a valid rating type.');
        }
        query[ratingType] = { $gte: threshold };
      }
      
      if (startDate && endDate) {
        query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      
      const feedbacks = await Feedback.find(query).populate('byUser', 'name email')
        .populate('forUser', 'name email');
      const response = new ApiResponse(200, feedbacks);
        res.status(200).json(response);
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  });
  

export { findFeedbacksByRating , findFeedbacksByDateRange, findFeedbacksWithCriteria };

