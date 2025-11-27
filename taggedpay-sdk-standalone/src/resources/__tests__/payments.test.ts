import axios from 'axios';
import { TaggedPayClient } from '../../client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Payments Resource', () => {
    let client: TaggedPayClient;

    beforeEach(() => {
        mockedAxios.create.mockReturnThis();
        client = new TaggedPayClient({ apiKey: 'test_key' });
    });

    it('should create a payment', async () => {
        const newPayment = { id: 'p1', amount: 100, currency: 'USD', status: 'pending', tag_id: 't1', created_at: '2023-01-01' };
        const mockResponse = { data: newPayment, success: true };
        mockedAxios.post.mockResolvedValue({ data: mockResponse });

        const response = await client.payments.create({ amount: 100, currency: 'USD', tag_id: 't1' });
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.post).toHaveBeenCalledWith('/payments', { amount: 100, currency: 'USD', tag_id: 't1' });
    });

    it('should get a payment by id', async () => {
        const mockPayment = { id: 'p1', amount: 100, currency: 'USD', status: 'completed', tag_id: 't1', created_at: '2023-01-01' };
        const mockResponse = { data: mockPayment, success: true };
        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const response = await client.payments.get('p1');
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith('/payments/p1');
    });
});
