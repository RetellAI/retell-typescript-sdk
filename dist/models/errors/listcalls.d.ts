import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class ListCallsResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListCallsResponse500ResponseBody);
}
/**
 * Unauthorized
 */
export declare class ListCallsResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListCallsResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class ListCallsResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListCallsResponseBody);
}
