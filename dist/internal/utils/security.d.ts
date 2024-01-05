export type SecurityProperties = {
    params: Record<string, string>;
    headers: Record<string, string>;
};
export declare function parseSecurityProperties(security: any): SecurityProperties;
