import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class GetAgentResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetAgentResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class GetAgentResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetAgentResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class GetAgentResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetAgentResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class GetAgentResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetAgentResponseBody);
}
