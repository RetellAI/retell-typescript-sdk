/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { HTTPClient } from "./http";
import { pathToFunc } from "./url";
import { RetryConfig } from "./retries";

/**
 * Contains the list of servers available to the SDK
 */
export const ServerList = [
  /**
   * The production server.
   */
  "https://api.retellai.com",
] as const;

export type SDKOptions = {
  apiKey?: string | (() => Promise<string>);

  httpClient?: HTTPClient;
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
  retryConfig?: RetryConfig;
};

export function serverURLFromOptions(options: SDKOptions): URL {
  let serverURL = options.serverURL;

  const params: Record<string, string> = {};
  const serverIdx = options.serverIdx ?? 0;

  if (!serverURL) {
    serverURL = ServerList[serverIdx] || "";
  }

  const u = pathToFunc(serverURL)(params);
  return new URL(u);
}

export const SDK_METADATA = Object.freeze({
  language: "typescript",
  openapiDocVersion: "1.0.0",
  sdkVersion: "1.15.9",
  genVersion: "2.228.1",
  userAgent: "speakeasy-sdk/typescript 1.15.9 2.228.1 1.0.0 retell-sdk",
});
