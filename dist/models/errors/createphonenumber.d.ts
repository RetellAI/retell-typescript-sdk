import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class CreatePhoneNumberResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneNumberResponse500ResponseBody);
}
/**
 * Unprocessable Content
 */
export declare class CreatePhoneNumberResponse422ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneNumberResponse422ResponseBody);
}
/**
 * Payment Required
 */
export declare class CreatePhoneNumberResponse402ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneNumberResponse402ResponseBody);
}
/**
 * Unauthorized
 */
export declare class CreatePhoneNumberResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneNumberResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class CreatePhoneNumberResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: CreatePhoneNumberResponseBody);
}
