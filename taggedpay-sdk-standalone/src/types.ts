export interface TaggedPayConfig {
    apiKey: string;
    baseUrl?: string;
}

export interface TaggedPayResponse<T> {
    data: T;
    success: boolean;
    error?: string;
}
