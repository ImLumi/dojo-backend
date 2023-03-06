import express from 'express';
import topicController from '../controllers/topic-controller';
import validatorHandler from '../middlewares/validator-handler';
import topicValidationSchema from '../validation-schemas/topic-validation-schema';
import authorCookieHandler from '../middlewares/author-cookie-handler';

const router = express.Router();

router.get('/', topicController.findAllTopic);
router.get('/:id', topicController.findOneTopic);
router.post('/', validatorHandler(topicValidationSchema), authorCookieHandler.set('topicCookie'), topicController.createTopic);
router.delete('/:id', authorCookieHandler.check('topicCookie'), topicController.deleteTopic);

export default router;
