/// <reference types="node" />
import * as utils from "../internal/utils";
import * as components from "../models/components";
import * as operations from "../models/operations";
import { AxiosStatic } from "axios";
import { AxiosRequestConfig } from "axios";
import { EventEmitter } from "events";
/**
 * Contains the list of servers available to the SDK
 */
export declare const ServerList: readonly ["https://api.re-tell.ai"];
/**
 * The available configuration options for the SDK
 */
export type SDKProps = {
    apiKey?: string;
    /**
     * Allows overriding the default axios client used by the SDK
     */
    defaultClient?: AxiosStatic;
    /**
     * Allows overriding the default server used by the SDK
     */
    serverIdx?: number;
    /**
     * Allows overriding the default server URL used by the SDK
     */
    serverURL?: string;
    /**
     * Allows overriding the default retry config used by the SDK
     */
    retryConfig?: utils.RetryConfig;
};
export declare class SDKConfiguration {
    defaultClient: AxiosStatic;
    security?: components.Security | (() => Promise<components.Security>);
    serverURL: string;
    serverDefaults: any;
    language: string;
    openapiDocVersion: string;
    sdkVersion: string;
    genVersion: string;
    retryConfig?: utils.RetryConfig;
    constructor(init?: Partial<SDKConfiguration>);
}
interface PromptParam {
    name: string;
    value: string;
}
export declare class LiveClient extends EventEmitter {
    ws: WebSocket;
    constructor(apiKey: string, agentId: string, sampleRate: number, agentPromptParams: PromptParam[], baseEndpoint: string);
    waitForReady(): Promise<void>;
    send(audio: Uint8Array): void;
    close(): void;
}
export declare function convertPCM16ToFloat32(array: Uint8Array): Float32Array;
export declare function convertFloat32ToPCM16(array: Float32Array): Uint8Array;
export declare class RetellClient {
    private sdkConfiguration;
    constructor(props?: SDKProps);
    createWebCall(apikey: string, agentId: string, sampleRate?: number, agentPromptParams?: never[], websocketEndpoint?: string): Promise<LiveClient>;
    /**
     * Create a new agent
     */
    createAgent(req: operations.CreateAgentRequestBody, config?: AxiosRequestConfig): Promise<operations.CreateAgentResponse>;
    /**
     * Initiate an outbound phone call.
     */
    createPhoneCall(req: operations.CreatePhoneCallRequestBody, config?: AxiosRequestConfig): Promise<operations.CreatePhoneCallResponse>;
    /**
     * Create a new phone number
     */
    createPhoneNumber(req: operations.CreatePhoneNumberRequestBody, config?: AxiosRequestConfig): Promise<operations.CreatePhoneNumberResponse>;
    /**
     * Delete an existing agent
     */
    deleteAgent(agentId: string, config?: AxiosRequestConfig): Promise<operations.DeleteAgentResponse>;
    /**
     * Delete a specific phone number
     */
    deletePhoneNumber(phoneNumber: string, config?: AxiosRequestConfig): Promise<operations.DeletePhoneNumberResponse>;
    /**
     * Retrieve details of a specific agent
     */
    getAgent(agentId: string, config?: AxiosRequestConfig): Promise<operations.GetAgentResponse>;
    /**
     * Retrieve details of a specific call
     */
    getCall(callId: string, config?: AxiosRequestConfig): Promise<operations.GetCallResponse>;
    /**
     * Retrieve info about a specific number
     */
    getPhoneNumber(phoneNumber: string, config?: AxiosRequestConfig): Promise<operations.GetPhoneNumberResponse>;
    /**
     * List all agents
     */
    listAgents(config?: AxiosRequestConfig): Promise<operations.ListAgentsResponse>;
    /**
     * Retrieve call details
     */
    listCalls(filterCriteria?: operations.FilterCriteria, limit?: number, sortOrder?: operations.SortOrder, config?: AxiosRequestConfig): Promise<operations.ListCallsResponse>;
    /**
     * List all purchased and active phone numbers
     */
    listPhoneNumbers(config?: AxiosRequestConfig): Promise<operations.ListPhoneNumbersResponse>;
    /**
     * Update an existing agent
     */
    updateAgent(agentNoDefaultNoRequired: components.AgentNoDefaultNoRequired, agentId: string, config?: AxiosRequestConfig): Promise<operations.UpdateAgentResponse>;
    /**
     * Update an existing phone number
     */
    updatePhoneAgent(requestBody: operations.UpdatePhoneAgentRequestBody, phoneNumber: string, config?: AxiosRequestConfig): Promise<operations.UpdatePhoneAgentResponse>;
}
export {};
