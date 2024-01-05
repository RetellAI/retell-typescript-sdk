import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class ListAgentsResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListAgentsResponseResponseBody);
}
/**
 * Unauthorized
 */
export declare class ListAgentsResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListAgentsResponseBody);
}
