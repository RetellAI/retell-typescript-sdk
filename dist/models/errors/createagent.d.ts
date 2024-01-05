import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class CreateAgentResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreateAgentResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class CreateAgentResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreateAgentResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class CreateAgentResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreateAgentResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class CreateAgentResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreateAgentResponseBody);
}
