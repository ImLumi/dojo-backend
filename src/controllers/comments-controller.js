import HttpError from '../utils/http-error';
import commentService from '../services/comments-service';

export default {
  async findComment(req, res, next) {
    if (!req.params?.id) return next(new HttpError('Missing id params', 400));
    try {
      const comment = await commentService.findOne(req.params.id);
      return res.status(201).send(comment);
    } catch (err) {
      return next(new HttpError(err.message, 400));
    }
  },

  async createComment(req, res, next) {
    try {
      const comment = await commentService.createOne(
        { ...req.validatedBody, author: req.body.authorId },
      );
      res.status(201).send(comment);
    } catch (err) {
      next(new HttpError(err.message, 400));
    }
  },

  async updateComment(req, res, next) {
    try {
      const comment = await commentService.updateOne(req.params.id, req.validatedBody);
      res.status(200).send(comment);
    } catch (err) {
      next(new HttpError(err.message, 400));
    }
  },

  async deleteComment(req, res, next) {
    if (!req.params?.id) return next(new HttpError('Missing id params.', 400));

    try {
      await commentService.deleteOne(req.params.id, req.body.authorId);
      return res.status(204).send();
    } catch (err) {
      return next(new HttpError(err.message, err.status || 400));
    }
  },
};
