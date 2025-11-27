import axios from 'axios';
import { TaggedPayClient } from '../../client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Tags Resource', () => {
    let client: TaggedPayClient;

    beforeEach(() => {
        mockedAxios.create.mockReturnThis();
        client = new TaggedPayClient({ apiKey: 'test_key' });
    });

    it('should list tags', async () => {
        const mockTags = [{ id: '1', name: 'Test Tag', created_at: '2023-01-01' }];
        const mockResponse = { data: mockTags, success: true };
        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const response = await client.tags.list();
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith('/tags');
    });

    it('should create a tag', async () => {
        const newTag = { id: '2', name: 'New Tag', created_at: '2023-01-02' };
        const mockResponse = { data: newTag, success: true };
        mockedAxios.post.mockResolvedValue({ data: mockResponse });

        const response = await client.tags.create({ name: 'New Tag' });
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.post).toHaveBeenCalledWith('/tags', { name: 'New Tag' });
    });

    it('should get a tag by id', async () => {
        const mockTag = { id: '1', name: 'Test Tag', created_at: '2023-01-01' };
        const mockResponse = { data: mockTag, success: true };
        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const response = await client.tags.get('1');
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith('/tags/1');
    });
});
