import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class UpdateAgentResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdateAgentResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class UpdateAgentResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdateAgentResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class UpdateAgentResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdateAgentResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class UpdateAgentResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdateAgentResponseBody);
}
