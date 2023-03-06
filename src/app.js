import cookieParser from 'cookie-parser';
import express from 'express';
import errorHandler from './middlewares/error-handler';
import { comments, topics } from './routers';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'hello cyclic :)' });
});

app.use('/comments', comments);
app.use('/topics', topics);

app.use(errorHandler);

export default app;
