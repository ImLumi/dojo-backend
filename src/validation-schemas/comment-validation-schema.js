import * as yup from 'yup';

export const create = yup.object({
  body: yup.object({
    content: yup.string().min(1).max(1000).required(),
    authorName: yup.string().min(3).max(20).required(),
    topicId: yup.string().length(24).required(),
  }),
});

export const update = yup.object({
  body: yup.object({
    content: yup.string().min(1).max(1000).required(),
    topicId: yup.string().strip(),
  }),
});
