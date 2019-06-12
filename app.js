import express from 'express'
import 'dotenv/config'

import './utils/connectDB';

import usersRouter from './routes/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', usersRouter);

module.exports = { app };
