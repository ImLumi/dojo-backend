import * as yup from 'yup';

export const create = yup.object({
  body: yup.object({
    title: yup.string().min(3).max(200).required(),
    authorName: yup.string().min(3).max(20).required(),
    description: yup.string().max(500),
  }),
});

export const update = yup.object({
  body: yup.object({
    title: yup.string().min(3).max(200).required(),
    description: yup.string().max(500),
  }),
});
