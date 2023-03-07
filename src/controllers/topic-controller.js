import HttpError from '../utils/http-error';
import topicService from '../services/topic-service';

export default {
  async findAllTopic(req, res, next) {
    try {
      const topics = await topicService.findAll();
      res.send(topics);
    } catch (err) {
      next(new HttpError(err.message, 400));
    }
  },

  async findOneTopic(req, res, next) {
    if (!req.params?.id) return next(new HttpError('Missing id!', 400));

    try {
      const topic = await topicService.findOne(req.params.id);
      return res.send(topic);
    } catch (err) {
      return next(new HttpError(err.message, err.status || 400));
    }
  },

  async createTopic(req, res, next) {
    try {
      const topic = await topicService.createOne(
        { ...req.validatedBody, author: req.body.authorId },
      );
      res.status(201).send(topic);
    } catch (err) {
      next(new HttpError(err.message, 400));
    }
  },

  async updateTopic(req, res, next) {
    try {
      const topic = await topicService.updateOne(req.params.id, req.validatedBody);
      res.status(200).send(topic);
    } catch (err) {
      next(new HttpError(err.message, 400));
    }
  },

  async deleteTopic(req, res, next) {
    if (!req.params?.id) return next(new HttpError('Missing id!', 400));

    try {
      await topicService.deleteOne(req.params.id, req.body.authorId);
      return res.status(204).send();
    } catch (err) {
      return next(new HttpError(err.message, 400));
    }
  },
};
