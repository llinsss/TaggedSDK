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
        mockedAxios.get.mockResolvedValue({ data: { data: mockTags, success: true } });

        const tags = await client.tags.list();
        expect(tags).toEqual(mockTags);
        expect(mockedAxios.get).toHaveBeenCalledWith('/tags');
    });

    it('should create a tag', async () => {
        const newTag = { id: '2', name: 'New Tag', created_at: '2023-01-02' };
        mockedAxios.post.mockResolvedValue({ data: { data: newTag, success: true } });

        const tag = await client.tags.create({ name: 'New Tag' });
        expect(tag).toEqual(newTag);
        expect(mockedAxios.post).toHaveBeenCalledWith('/tags', { name: 'New Tag' });
    });

    it('should get a tag by id', async () => {
        const mockTag = { id: '1', name: 'Test Tag', created_at: '2023-01-01' };
        mockedAxios.get.mockResolvedValue({ data: { data: mockTag, success: true } });

        const tag = await client.tags.get('1');
        expect(tag).toEqual(mockTag);
        expect(mockedAxios.get).toHaveBeenCalledWith('/tags/1');
    });
});
