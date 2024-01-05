import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class DeleteAgentResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeleteAgentResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class DeleteAgentResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeleteAgentResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class DeleteAgentResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeleteAgentResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class DeleteAgentResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeleteAgentResponseBody);
}
