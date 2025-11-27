export class TaggedPayError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TaggedPayError';
    }
}

export class APIError extends TaggedPayError {
    public readonly status: number;
    public readonly code?: string;

    constructor(status: number, message: string, code?: string) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.code = code;
    }
}
