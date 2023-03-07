import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import authorServices from '../services/author-services';
import AccessForbiddenHttpError from '../utils/access-forbidden-http-error';

export default {
  check(cookieName) {
    return async (req, res, next) => {
      const cookie = req.cookies[cookieName];
      if (!cookie) return next(new AccessForbiddenHttpError());
      const cookieId = JSON.parse(cookie).author;
      const author = await authorServices.findOne(cookieId);
      if (!author) return next(new AccessForbiddenHttpError());
      req.body.authorId = author.id;
      return next();
    };
  },

  set(cookieName) {
    return async (req, res, next) => {
      const oldCookie = req.cookies[cookieName];
      const cookieId = (!oldCookie) ? uuid() : JSON.parse(oldCookie).author;
      const author = await authorServices.createOrUpdate(cookieId);
      res.cookie(cookieName, JSON.stringify({ author: cookieId }), {
        someSite: 'none',
        secure: false,
        httpOnly: true,
        expires: dayjs().add(6, 'minutes').toDate(),
      });
      req.body.authorId = author.id;
      next();
    };
  },
};
