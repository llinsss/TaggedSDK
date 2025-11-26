import axios, { AxiosInstance } from 'axios';
import { TaggedPayConfig } from './types';
import { Tags } from './resources/tags';
import { Payments } from './resources/payments';

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

        this.tags = new Tags(this.client);
        this.payments = new Payments(this.client);
    }
}
