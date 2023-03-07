import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import { comments, topics } from './routers';
import swagger from './swagger';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/comments', comments);
app.use('/topics', topics);
app.use('/', swagger);

app.use(errorHandler);

export default app;
