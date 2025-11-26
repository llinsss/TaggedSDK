export interface TaggedPayConfig {
    apiKey: string;
    baseUrl?: string;
}

export interface TaggedPayResponse<T> {
    data: T;
    success: boolean;
    error?: string;
}

export interface Tag {
    id: string;
    name: string;
    description?: string;
    created_at: string;
}

export interface CreateTagParams {
    name: string;
    description?: string;
}

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    tag_id: string;
    created_at: string;
}

export interface CreatePaymentParams {
    amount: number;
    currency: string;
    tag_id: string;
}
