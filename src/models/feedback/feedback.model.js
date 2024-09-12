import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    feedback: {
      type: String,
      required: true,
    },
    overAllRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    forUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    knowledgeRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    communicationRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    behaviorRating: {  // Corrected spelling: "behaviour" to "behavior" (American spelling)
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    sincerityRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    availabilityRating: {  // Corrected spelling: "avaibility" to "availability"
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    engagementRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    attendanceRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    wayOfTeachingRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    subjectKnowledgeRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    fairnessRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  });
  
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;