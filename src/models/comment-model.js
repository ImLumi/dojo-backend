import { Schema, model } from 'mongoose';

const topicSchema = new Schema({
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
  topic: { type: Schema.Types.ObjectId, required: true, ref: 'Topic' },
}, { timestamps: true });

topicSchema.method('toClient', function () {
  const comment = this.toObject();
  comment.id = comment._id;
  delete comment._id;
  return comment;
});

export default model('Comment', topicSchema);
