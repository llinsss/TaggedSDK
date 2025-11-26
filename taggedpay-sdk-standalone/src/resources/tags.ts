import { BaseResource } from './base';
import { Tag, CreateTagParams, TaggedPayResponse } from '../types';

export class Tags extends BaseResource {
    async list(): Promise<TaggedPayResponse<Tag[]>> {
        const response = await this.client.get<TaggedPayResponse<Tag[]>>('/tags');
        return response.data;
    }

    async create(params: CreateTagParams): Promise<TaggedPayResponse<Tag>> {
        const response = await this.client.post<TaggedPayResponse<Tag>>('/tags', params);
        return response.data;
    }

    async get(id: string): Promise<TaggedPayResponse<Tag>> {
        const response = await this.client.get<TaggedPayResponse<Tag>>(`/tags/${id}`);
        return response.data;
    }
}
