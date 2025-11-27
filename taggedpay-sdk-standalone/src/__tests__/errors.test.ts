import axios from 'axios';
import { TaggedPayClient } from '../client';
import { APIError } from '../errors';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Error Handling', () => {
    let client: TaggedPayClient;
    let interceptorCallback: (error: any) => Promise<any>;

    beforeEach(() => {
        // Mock interceptors.response.use to capture the callback
        const useMock = jest.fn((success, error) => {
            interceptorCallback = error;
            return 0;
        });

        // Setup the mock structure for axios.create
        mockedAxios.create.mockReturnValue({
            interceptors: {
                response: {
                    use: useMock,
                },
            },
        } as any);

        client = new TaggedPayClient({ apiKey: 'test_key' });
    });

    it('should throw APIError on 400 bad request', async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: { error: 'Invalid parameters', code: 'INVALID_PARAMS' },
            },
        };

        try {
            await interceptorCallback(errorResponse);
            fail('Should have thrown APIError');
        } catch (error) {
            expect(error).toBeInstanceOf(APIError);
            if (error instanceof APIError) {
                expect(error.status).toBe(400);
                expect(error.message).toBe('Invalid parameters');
                expect(error.code).toBe('INVALID_PARAMS');
            }
        }
    });

    it('should throw APIError on 500 server error', async () => {
        const errorResponse = {
            response: {
                status: 500,
                data: { error: 'Internal Server Error' },
            },
        };

        try {
            await interceptorCallback(errorResponse);
            fail('Should have thrown APIError');
        } catch (error) {
            expect(error).toBeInstanceOf(APIError);
            if (error instanceof APIError) {
                expect(error.status).toBe(500);
                expect(error.message).toBe('Internal Server Error');
            }
        }
    });

    it('should rethrow non-axios errors', async () => {
        const genericError = new Error('Network Error');

        try {
            await interceptorCallback(genericError);
            fail('Should have thrown Error');
        } catch (error) {
            expect(error).toBe(genericError);
        }
    });
});
