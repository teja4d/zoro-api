// src/utils/responseUtil.ts

export interface ApiSuccessResponse<T = unknown> {
    success: true;
    data?: T;
}

export interface ApiErrorResponse {
    success: false;
    error: string;

    data?:null;
}

export const createSuccessResponse = <T>(data: T): ApiSuccessResponse<T> => ({
    success: true,
    data,
});

export const createErrorResponse = (error: string): ApiErrorResponse => ({
    success: false,
    error,
    data: null,
});
