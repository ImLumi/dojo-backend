import * as yup from 'yup';

export default yup.object({
  body: yup.object({
    content: yup.string().min(1).max(200).required(),
    authorName: yup.string().min(3).max(20).required(),
    topicId: yup.string().min(3),
  }),
});
