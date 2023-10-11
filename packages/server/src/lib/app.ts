import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from '~/components/routers/base';
import deserializeUser from '~/middlewares/deserializeUser';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(deserializeUser);

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use('/api/v1/images', express.static('images'));

app.use('/api/v1', router);

export default app;
