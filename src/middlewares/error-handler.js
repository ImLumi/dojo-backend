// eslint-disable-next-line no-unused-vars
export default function (err, req, res, next) {
  if (err?.status) {
    return res.status(err.status).send({ error: err.message });
  }

  return res.status(500).send({ error: 'server internal error!' });
}
