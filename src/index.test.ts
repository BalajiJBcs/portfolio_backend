import request from 'supertest';
import app from './index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('GET /api/balance-sheet', () => {
  it('should return balance sheet data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { message: 'Mocked balance sheet data' },
    });

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Mocked balance sheet data' });
  });

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Mocked API error'));

    const response = await request(app).get('/api/balance-sheet');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch balance sheet data');
  });
});
