import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class GetPhoneNumberResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetPhoneNumberResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class GetPhoneNumberResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetPhoneNumberResponse422ResponseBody);
}
/**
 * Unauthorized
 */
export declare class GetPhoneNumberResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetPhoneNumberResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class GetPhoneNumberResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: GetPhoneNumberResponseBody);
}
