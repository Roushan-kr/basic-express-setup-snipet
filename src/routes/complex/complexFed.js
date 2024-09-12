import {Router} from 'express'
import {findFeedbacksByRating , findFeedbacksByDateRange, findFeedbacksWithCriteria} from '../../controllers/feedback/complex.controller.js'
const complexFed = Router();

complexFed.get('/byRating', findFeedbacksByRating);
complexFed.get('/byDateRange', findFeedbacksByDateRange);
complexFed.get('/withCriteria', findFeedbacksWithCriteria);


export default complexFed;