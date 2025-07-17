import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { startServerWithDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

startServerWithDB(app, PORT);



