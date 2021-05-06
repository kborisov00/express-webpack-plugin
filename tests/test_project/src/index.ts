'use strict';

import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
    // res.send('this is a test response bruh');
    res.send('this is a test response dawg');
});

app.listen(port, () => console.log(`listening on ${port}`));
