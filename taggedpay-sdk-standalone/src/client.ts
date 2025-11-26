import axios, { AxiosInstance } from 'axios';
import { TaggedPayConfig } from './types';

const DEFAULT_BASE_URL = 'https://api.taggedpay.com/v1';

export class TaggedPayClient {
    private client: AxiosInstance;

    constructor(config: TaggedPayConfig) {
        this.client = axios.create({
            baseURL: config.baseUrl || DEFAULT_BASE_URL,
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    // Resources will be initialized here
}
