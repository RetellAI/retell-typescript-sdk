import { AxiosResponse } from "axios";
export declare class BackoffStrategy {
    initialInterval: number;
    maxInterval: number;
    exponent: number;
    maxElapsedTime: number;
    constructor(initialInterval: number, maxInterval: number, exponent: number, maxElapsedTime: number);
}
export declare class RetryConfig {
    strategy: "backoff" | "none";
    backoff?: BackoffStrategy;
    retryConnectionErrors: boolean;
    constructor(strategy: "backoff" | "none", backoff?: BackoffStrategy, retryConnectionErrors?: boolean);
}
export declare class Retries {
    config: RetryConfig;
    statusCodes: string[];
    constructor(config: RetryConfig, statusCodes: string[]);
}
export declare function Retry(fn: () => Promise<AxiosResponse<any, any>>, retries: Retries): Promise<AxiosResponse<any, any>>;
