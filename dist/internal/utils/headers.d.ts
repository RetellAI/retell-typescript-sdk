import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
export declare const headerMetadataKey = "header";
export declare function getHeadersFromRequest(headerParams: any): any;
export declare function getHeadersFromResponse(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): Record<string, string[]>;
