import HttpError from '../utils/http-error';

export default function (schema) {
  return async (req, res, next) => {
    try {
      const { body, query, params } = req;
      await schema.validate({ body, query, params });
      req.validatedBody = schema.cast({ body }, { stripUnknown: true }).body;
      next();
    } catch (e) {
      next(new HttpError('Validation error!', 400));
    }
  };
}
