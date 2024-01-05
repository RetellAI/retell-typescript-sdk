import { AxiosResponse } from "axios";
export declare class SDKError extends Error {
    statusCode: number;
    body: string;
    rawResponse: AxiosResponse;
    constructor(message: string, statusCode: number, body: string, rawResponse: AxiosResponse);
}
