import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class UpdatePhoneAgentResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdatePhoneAgentResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class UpdatePhoneAgentResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdatePhoneAgentResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class UpdatePhoneAgentResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdatePhoneAgentResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class UpdatePhoneAgentResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: UpdatePhoneAgentResponseBody);
}
