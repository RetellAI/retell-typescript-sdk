import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class GetCallResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetCallResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class GetCallResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetCallResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class GetCallResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetCallResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class GetCallResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetCallResponseBody);
}
