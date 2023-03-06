import HttpError from './http-error';

export default class AccessForbiddenHttpError extends HttpError {
  constructor(name = 'Access to that resource is forbidden.') {
    super(name, 403);
  }
}
