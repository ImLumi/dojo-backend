import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  cookieId: { type: String },
  expireAt: { type: Date, expires: 60 * 5, default: Date.now },
});

export default model('Author', authorSchema);
