import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { startServerWithDB } from './db.js';
import authRoutes from './routes/auth.js';
import formsRouter from './routes/forms.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRouter);

startServerWithDB();
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




