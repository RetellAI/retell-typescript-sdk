import { AxiosResponse } from "axios";
/**
 * Internal Server Error
 */
export declare class ListPhoneNumbersResponse500ResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListPhoneNumbersResponse500ResponseBody);
}
/**
 * Unauthorized
 */
export declare class ListPhoneNumbersResponseResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListPhoneNumbersResponseResponseBody);
}
/**
 * Bad Request
 */
export declare class ListPhoneNumbersResponseBody extends Error {
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse?: AxiosResponse;
    errorMessage?: string;
    constructor(err?: ListPhoneNumbersResponseBody);
}
