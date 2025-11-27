```typescript
import { BaseResource } from './base';
import { Tag, CreateTagParams, TaggedPayResponse, PaginationParams } from '../types';

export class Tags extends BaseResource {
    async list(params?: PaginationParams): Promise<TaggedPayResponse<Tag[]>> {
        const response = await this.client.get<TaggedPayResponse<Tag[]>>('/tags', { params });
        return response.data;
    }

    async create(params: CreateTagParams): Promise<TaggedPayResponse<Tag>> {
        const response = await this.client.post<TaggedPayResponse<Tag>>('/tags', params);
        return response.data;
    }

    async get(id: string): Promise<TaggedPayResponse<Tag>> {
        const response = await this.client.get<TaggedPayResponse<Tag>>(`/ tags / ${ id } `);
        return response.data;
    }
}
