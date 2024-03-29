import express from 'express';
import topicController from '../controllers/topics-controller';
import validatorHandler from '../middlewares/validator-handler';
import { create, update } from '../validation-schemas/topics-validation-schema';
import authorCookieHandler from '../middlewares/author-cookie-handler';

const router = express.Router();

router.get('/', topicController.findAllTopic);
router.get('/:id', topicController.findOneTopic);
router.post('/', validatorHandler(create), authorCookieHandler.set('topicCookie'), topicController.createTopic);
router.delete('/:id', authorCookieHandler.check('topicCookie'), topicController.deleteTopic);
router.patch('/:id', validatorHandler(update), authorCookieHandler.check('topicCookie'), topicController.updateTopic);

export default router;
