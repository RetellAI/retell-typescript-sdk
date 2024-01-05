import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class CreatePhoneCallResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponse500ResponseBody);
}
/**
 * Too Many Requests
 */
export declare class CreatePhoneCallResponse429ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponse429ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class CreatePhoneCallResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponse422ResponseBody);
}
/**
 * Payment Required
 */
export declare class CreatePhoneCallResponse402ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponse402ResponseBody);
}
/**
 * Unauthorized
 */
export declare class CreatePhoneCallResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class CreatePhoneCallResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneCallResponseBody);
}
