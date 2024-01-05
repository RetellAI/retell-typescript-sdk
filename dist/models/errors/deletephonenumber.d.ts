import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class DeletePhoneNumberResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeletePhoneNumberResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class DeletePhoneNumberResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeletePhoneNumberResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class DeletePhoneNumberResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeletePhoneNumberResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class DeletePhoneNumberResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: DeletePhoneNumberResponseBody);
}
