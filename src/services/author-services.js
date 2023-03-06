import AuthorModel from '../models/author-model';

export default {
  async findOne(cookieId) {
    return AuthorModel.findOne({ cookieId });
  },

  async createOrUpdate(cookieId) {
    let author = await AuthorModel.findOne({ cookieId });
    if (!author) author = new AuthorModel({ cookieId });
    author.updatedAt = new Date();
    await author.save();
    return author;
  },
};
