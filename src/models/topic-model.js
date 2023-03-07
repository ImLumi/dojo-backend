/* eslint-disable no-param-reassign */
import { Schema, model, isValidObjectId } from 'mongoose';

const topicSchema = new Schema({
  title: { type: String, maxLength: 100, required: true },
  description: { type: String, maxLength: 500, default: '' },
  authorName: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

topicSchema.method('toClient', function () {
  const topic = this.toObject();
  topic.id = topic._id;
  delete topic._id;
  if (!isValidObjectId(topic.comments[0])) {
    topic.comments.forEach((comment) => {
      if (!comment?._id) return;
      comment.id = comment._id;
      delete comment._id;
    });
  }
  return topic;
});

export default model('Topic', topicSchema);
