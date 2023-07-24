export type PayloadResponse = {
    success: boolean;
    body: any;
};

export function ok<T>(dto?: T): PayloadResponse {
    return {
        success: true,
        body: dto,
    };
}

export function created(): PayloadResponse {
    return {
        success: true,
        body: undefined,
    };
}

export function clientError(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function unauthorized(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function forbidden(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function notFound(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function conflict(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function tooMany(error: Error): PayloadResponse {
    return {
        success: false,
        body: {
            error: error.message,
        },
    };
}

export function fail(error: Error) {
    console.log(error);

    return {
        success: false,
        body: { data: `success=false;msg=${error.message}` }
    };
}
