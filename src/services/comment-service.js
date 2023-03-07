import CommentModel from '../models/comment-model';
import topicService from './topic-service';
import HttpError from '../utils/http-error';

export default {
  async findOne(id) {
    const comment = await CommentModel.findById(id);
    if (!comment) throw new HttpError('Comment is not found!', 400);
    return comment.toClient();
  },

  async createOne({ topicId, ...payloads }) {
    const topic = await topicService.findOne(topicId);
    if (!topic) throw new HttpError('Wrong topic id.', 400);
    const comment = new CommentModel({ topic: topicId, ...payloads });
    await comment.save();
    await topicService.addComments(topicId, comment._id);
    return comment.toClient();
  },

  async updateOne(id, payload) {
    const update = await CommentModel.updateOne({ _id: id }, payload);
    if (update.matchedCount === 0) throw new HttpError('Comment is not found', 400);
    return { updated: true };
  },

  async deleteOne(id, authorId) {
    const comment = await CommentModel.findOne({ _id: id });
    if (!comment) throw new HttpError('Comment is not found', 400);
    if (comment.author.toString() !== authorId) throw new HttpError('Access denied', 400);
    await topicService.deleteComment(comment.topic, comment.id);
    await comment.deleteOne();
    return true;
  },

};
