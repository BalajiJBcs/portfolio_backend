import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/balance-sheet', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://localhost:3000/api.xro/2.0/Reports/BalanceSheet');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    res.status(500).json({ error: 'Failed to fetch balance sheet data' });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
