import TopicModel from '../models/topic-model';
import HttpError from '../utils/http-error';
import AccessForbiddenHttpError from '../utils/access-forbidden-http-error';
import CommentModel from '../models/comment-model';

export default {
  async findAll() {
    const topics = await TopicModel.find({});
    return topics.map((topic) => topic.toClient());
  },

  async findOne(id) {
    const topic = await TopicModel.findById(id).populate('comments');
    if (!topic) throw new HttpError('Topic is not found!', 400);
    return topic.toClient();
  },

  async deleteOne(id, authorId) {
    const topic = await TopicModel.findOne({ _id: id });
    if (!topic) throw new HttpError('Topic is not found', 400);
    if (topic.author.toString() !== authorId) throw new AccessForbiddenHttpError();
    await CommentModel.deleteMany({ _id: { $in: topic.comments } });
    await topic.deleteOne();
    return true;
  },

  async createOne(payload) {
    const topic = new TopicModel(payload);
    await topic.save();
    return topic.toClient();
  },

  async updateOne(id, payload) {
    const update = await TopicModel.updateOne({ _id: '640784d4496dbce697337e09' }, payload);
    if (update.matchedCount === 0) throw new HttpError('Topic is not found', 400);
    return { updated: true };
  },

  async deleteComment(id, commentId) {
    return TopicModel.updateOne({ _id: id }, { $pull: { comments: commentId } });
  },

  async addComments(id, commentId) {
    return TopicModel.updateOne({ _id: id }, { $push: { comments: commentId } });
  },
};
