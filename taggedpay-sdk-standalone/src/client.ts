import axios, { AxiosInstance, AxiosError } from 'axios';
import { TaggedPayConfig } from './types';
import { Tags } from './resources/tags';
import { Payments } from './resources/payments';
import { APIError } from './errors';

const DEFAULT_BASE_URL = 'https://api.taggedpay.com/v1';

export class TaggedPayClient {
    private client: AxiosInstance;
    public tags: Tags;
    public payments: Payments;

    constructor(config: TaggedPayConfig) {
        this.client = axios.create({
            baseURL: config.baseUrl || DEFAULT_BASE_URL,
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response) {
                    const status = error.response.status;
                    const data = error.response.data as any;
                    const message = data?.error || error.message;
                    const code = data?.code;
                    throw new APIError(status, message, code);
                }
                throw error;
            }
        );

        this.tags = new Tags(this.client);
        this.payments = new Payments(this.client);
    }
}
