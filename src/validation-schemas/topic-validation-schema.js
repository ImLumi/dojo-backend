import * as yup from 'yup';

export default yup.object({
  body: yup.object({
    title: yup.string().min(3).max(1000).required(),
    authorName: yup.string().min(3).max(20).required(),
    description: yup.string().max(500),
  }),
});
