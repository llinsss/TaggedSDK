import { BaseResource } from './base';
import { Payment, CreatePaymentParams, TaggedPayResponse } from '../types';

export class Payments extends BaseResource {
    async create(params: CreatePaymentParams): Promise<TaggedPayResponse<Payment>> {
        const response = await this.client.post<TaggedPayResponse<Payment>>('/payments', params);
        return response.data;
    }

    async get(id: string): Promise<TaggedPayResponse<Payment>> {
        const response = await this.client.get<TaggedPayResponse<Payment>>(`/payments/${id}`);
        return response.data;
    }
}
