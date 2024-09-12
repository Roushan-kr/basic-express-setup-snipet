import Feedback from "../../models/feedback/feedback.model.js";
import {asyncHandlear} from "../../utils/asyncHandlear.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

const createFeedback = asyncHandlear(async (req, res) => {
  const {
    feedback,
    overAllRating,
    byUser, // obj id corresponding to user - student
    forUser, // obj id corresponding to user - faculty
    knowledgeRating,
    communicationRating,
    behaviorRating,
    sincerityRating,
    availabilityRating,
    engagementRating,
    attendanceRating,
    wayOfTeachingRating,
    subjectKnowledgeRating,
    fairnessRating,
  } = req.body;

  // Validate required fields
  if (
    !feedback ||
    overAllRating === undefined ||
    !knowledgeRating ||
    !communicationRating ||
    !behaviorRating ||
    !sincerityRating ||
    !availabilityRating ||
    !engagementRating ||
    !attendanceRating ||
    !wayOfTeachingRating ||
    !subjectKnowledgeRating ||
    !fairnessRating
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // Validate that ratings are between 1 and 5
  const ratings = [
    overAllRating,
    knowledgeRating,
    communicationRating,
    behaviorRating,
    sincerityRating,
    availabilityRating,
    engagementRating,
    attendanceRating,
    wayOfTeachingRating,
    subjectKnowledgeRating,
    fairnessRating,
  ];

  if (ratings.some((rating) => rating < 1 || rating > 5)) {
    throw new ApiError(400, "Ratings must be between 1 and 5.");
  }

  // Create new feedback
  const newFeedback = new Feedback({
    feedback,
    overAllRating,
    byUser,
    forUser,
    knowledgeRating,
    communicationRating,
    behaviorRating,
    sincerityRating,
    availabilityRating,
    engagementRating,
    attendanceRating,
    wayOfTeachingRating,
    subjectKnowledgeRating,
    fairnessRating,
  });

  // Save feedback to the database
  await newFeedback.save();

  // Send response
  const response = new ApiResponse(
    201,
    newFeedback,
    "Feedback created successfully.",
  );
  res.status(response.status).json(response);
});

const getFacFeed = asyncHandlear(async (req, res) => {
  const { facid } = req.query;
  const feedbacks = await Feedback.find({ forUser: facid }).populate(
    "byUser",
    "name email",
  );
  const response = new ApiResponse(
    200,
    feedbacks,
    "Feedbacks retrieved successfully.",
  );
  res.status(response.status).json(response);
});

const getFeedbackById = asyncHandlear(async (req, res) => {
  const feedbackId = req.params.id;
  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) {
    throw new ApiError(404, "Feedback not found.");
  }
  const response = new ApiResponse(
    200,
    feedback,
    "Feedback retrieved successfully.",
  );
  res.status(response.status).json(response);
});

const updateFeedback = asyncHandlear(async (req, res) => {
  const feedbackId = req.params.id;
  const {
    feedback,
    overAllRating,
    knowledgeRating,
    communicationRating,
    behaviorRating,
    sincerityRating,
    availabilityRating,
    engagementRating,
    attendanceRating,
    wayOfTeachingRating,
    subjectKnowledgeRating,
    fairnessRating,
  } = req.body;

  // Validate required fields
  if (
    !feedback ||
    overAllRating === undefined ||
    !knowledgeRating ||
    !communicationRating ||
    !behaviorRating ||
    !sincerityRating ||
    !availabilityRating ||
    !engagementRating ||
    !attendanceRating ||
    !wayOfTeachingRating ||
    !subjectKnowledgeRating ||
    !fairnessRating
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // Validate that ratings are between 1 and 5
  const ratings = [
    overAllRating,
    knowledgeRating,
    communicationRating,
    behaviorRating,
    sincerityRating,
    availabilityRating,
    engagementRating,
    attendanceRating,
    wayOfTeachingRating,
    subjectKnowledgeRating,
    fairnessRating,
  ];

  if (ratings.some((rating) => rating < 1 || rating > 5)) {
    throw new ApiError(400, "Ratings must be between 1 and 5.");
  }

  // Update feedback in the database
  const updatedFeedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    {
      feedback,
      overAllRating,
      knowledgeRating,
      communicationRating,
      behaviorRating,
      sincerityRating,
      availabilityRating,
      engagementRating,
      attendanceRating,
      wayOfTeachingRating,
      subjectKnowledgeRating,
      fairnessRating,
    },
    { new: true },
  );

  // Send response
  const response = new ApiResponse(
    200,
    updatedFeedback,
    "Feedback updated successfully.",
  );
  res.status(response.status).json(response);
});

const deleteFeedback = asyncHandlear(async (req, res) => {
  const feedbackId = req.params.id;
  await Feedback.findByIdAndDelete(feedbackId);
  const response = new ApiResponse(200, null, "Feedback deleted successfully.");
  res.status(response.status).json(response);
});

const overview = asyncHandlear(async (req, res) => {
    const { facid } = req.query;
    const feedbacks = await Feedback.find({ forUser: facid });
    const response = new ApiResponse(
      200,
      feedbacks,
      "Feedbacks retrieved successfully.",
    );
    res.status(response.status).json(response);
});

export {
  createFeedback,
  getFacFeed,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  overview,
};
