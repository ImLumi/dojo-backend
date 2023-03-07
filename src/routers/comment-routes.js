import express from 'express';
import commentController from '../controllers/comment-controller';
import validatorHandler from '../middlewares/validator-handler';
import { create, update } from '../validation-schemas/comment-validation-schema';
import authorCookieHandler from '../middlewares/author-cookie-handler';

const router = express.Router();

router.get('/:id', commentController.findComment);
router.delete('/:id', authorCookieHandler.check('commentCookie'), commentController.deleteComment);
router.post('/', validatorHandler(create), authorCookieHandler.set('commentCookie'), commentController.createComment);
router.patch('/:id', validatorHandler(update), authorCookieHandler.check('commentCookie'), commentController.updateComment);

export default router;
