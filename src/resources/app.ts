// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class App extends APIResource {
  /**
   * Create an App: the connection to one external system (a CRM, calendar, support
   * desk, and so on), holding its credentials and settings. Providers with
   * caller-managed credentials accept auth_config. Providers using the OAuth
   * callback must omit auth_config and be authorized through connect-app.
   * Credentials are stored encrypted and never returned. Up to 20 apps per provider.
   */
  create(body: AppCreateParams, options?: RequestOptions): APIPromise<AppResponse> {
    return this._client.post('/create-app', { body, ...options });
  }

  /**
   * Partially update an App. Omitted fields remain unchanged. Updating auth_config
   * or tenant metadata invalidates the cached provider token immediately. Providers
   * using the OAuth callback reject auth_config and must be reauthorized through
   * connect-app.
   */
  update(appID: string, body: AppUpdateParams, options?: RequestOptions): APIPromise<AppResponse> {
    return this._client.patch(path`/update-app/${appID}`, { body, ...options });
  }

  /**
   * List Apps in the organization (paginated).
   */
  list(query: AppListParams | null | undefined = {}, options?: RequestOptions): APIPromise<AppListResponse> {
    return this._client.get('/list-apps', { query, ...options });
  }

  /**
   * Delete an App. Fails when agents or knowledge bases still reference it, unless
   * force_delete is set. If a CRM config is linked to this App, the link is cleared.
   */
  delete(
    appID: string,
    params: AppDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { force_delete } = params ?? {};
    return this._client.delete(path`/delete-app/${appID}`, {
      query: { force_delete },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get an App by id.
   */
  get(appID: string, options?: RequestOptions): APIPromise<AppResponse> {
    return this._client.get(path`/get-app/${appID}`, options);
  }

  /**
   * List the agents and knowledge bases referencing an App, most recently configured
   * first by default.
   */
  listUsages(
    appID: string,
    query: AppListUsagesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AppListUsagesResponse> {
    return this._client.get(path`/list-app-usages/${appID}`, { query, ...options });
  }

  /**
   * Probe the App's stored credentials by making a minimal authenticated call to the
   * provider. Returns success=true on a successful round-trip, and records the
   * outcome on the App's connection_status either way.
   */
  testAuth(appID: string, options?: RequestOptions): APIPromise<AppTestAuthResponse> {
    return this._client.post(path`/test-app-auth/${appID}`, options);
  }
}

export interface AppResponse {
  app_id: string;

  created_timestamp: number;

  org_id: string;

  /**
   * Provider name. Must be valid for the App's type; the supported providers per
   * type are listed by list-app-templates.
   */
  provider: string;

  /**
   * App integration category.
   */
  type: 'crm' | 'calendar' | 'knowledge_base' | 'support' | 'communication';

  user_modified_timestamp: number;

  /**
   * Non-secret auth metadata. Encrypted secret fields are never returned by the API.
   */
  auth_config?:
    | AppResponse.OAuthConfigResponse
    | AppResponse.APIKeyAuthConfigResponse
    | AppResponse.AccessTokenAuthConfigResponse
    | AppResponse.BasicAuthConfigResponse
    | AppResponse.RefreshTokenAuthConfigResponse;

  /**
   * Connection health of the App, server-managed. `not_connected` after create or a
   * credential / tenant URL change; `connected` once verified via OAuth connect, an
   * auth test, or a successful live tool call; `error` when the provider rejects the
   * credentials (on connect, an auth test, or a live tool call).
   */
  connection_status?: 'not_connected' | 'connected' | 'error';

  crm_config?: AppResponse.CRMConfig;

  name?: string;

  /**
   * Sub-account id, for providers that scope requests by a sub-account id on a
   * shared host. Omitted by every other provider.
   */
  tenant_id?: string;

  /**
   * Microsoft OneDrive account type discovered during OAuth.
   */
  tenant_type?: 'business' | 'personal';

  /**
   * Per-tenant API base URL. Set by providers with per-org hosts; omitted by
   * providers on a single global host. For OneDrive for Business, this is the
   * tenant's -my.sharepoint.com origin used by File Picker v8; personal OneDrive
   * omits it.
   */
  tenant_url?: string;
}

export namespace AppResponse {
  export interface OAuthConfigResponse {
    client_id: string;

    type: 'oauth2';
  }

  export interface APIKeyAuthConfigResponse {
    type: 'api_key';
  }

  export interface AccessTokenAuthConfigResponse {
    type: 'access_token';
  }

  export interface BasicAuthConfigResponse {
    type: 'basic';

    username: string;
  }

  export interface RefreshTokenAuthConfigResponse {
    type: 'refresh_token';
  }

  export interface CRMConfig {
    /**
     * Field mappings applied when syncing CRM records into Retell contacts. Must
     * include phone_number, which is the field the two systems are matched on.
     */
    inbound_sync_mappings?: Array<CRMConfig.InboundSyncMapping>;

    /**
     * Field mappings applied when writing Retell contact changes back to the CRM.
     */
    outbound_sync_mappings?: Array<CRMConfig.OutboundSyncMapping>;

    /**
     * Whether to push call/chat activity to the external CRM. Opt-in — defaults to
     * false when unset.
     */
    sync_conversation_activity?: boolean;

    /**
     * Whether to create a CRM record after a conversation when the contact is not yet
     * linked to one.
     */
    sync_new_contacts?: boolean;
  }

  export namespace CRMConfig {
    export interface InboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }

    export interface OutboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }
  }
}

export interface AppListResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<AppResponse>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export interface AppListUsagesResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<AppListUsagesResponse.AgentAppUsage | AppListUsagesResponse.KnowledgeBaseAppUsage>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export namespace AppListUsagesResponse {
  export interface AgentAppUsage {
    agent_id: string;

    /**
     * Agent versions referencing this app, largest first.
     */
    agent_versions: Array<number>;

    /**
     * When this reference was last recorded, in milliseconds.
     */
    configured_timestamp: number;

    type: 'agent';

    /**
     * Current agent name; omitted if the agent was deleted.
     */
    agent_name?: string;
  }

  export interface KnowledgeBaseAppUsage {
    /**
     * When this reference was last recorded, in milliseconds.
     */
    configured_timestamp: number;

    knowledge_base_id: string;

    type: 'knowledge_base';

    /**
     * Current knowledge base name; omitted if it was deleted.
     */
    knowledge_base_name?: string;
  }
}

export interface AppTestAuthResponse {
  success: boolean;
}

export interface AppCreateParams {
  /**
   * Provider name. Must be valid for the App's type; the supported providers per
   * type are listed by list-app-templates.
   */
  provider: string;

  /**
   * App integration category.
   */
  type: 'crm' | 'calendar' | 'knowledge_base' | 'support' | 'communication';

  /**
   * Caller-managed credentials. Providers using the OAuth callback reject
   * auth_config and must be authorized through connect-app.
   */
  auth_config?:
    | AppCreateParams.OAuthConfigRequest
    | AppCreateParams.APIKeyAuthConfigRequest
    | AppCreateParams.BasicAuthConfigRequest;

  crm_config?: AppCreateParams.CRMConfig;

  /**
   * Display name.
   */
  name?: string;

  /**
   * Sub-account id, for providers that scope requests by a sub-account id on a
   * shared host.
   */
  tenant_id?: string;

  /**
   * Per-tenant API base URL.
   */
  tenant_url?: string;
}

export namespace AppCreateParams {
  export interface OAuthConfigRequest {
    client_id: string;

    /**
     * Secret credential; stored encrypted at rest.
     */
    client_secret: string;

    type: 'oauth2';
  }

  export interface APIKeyAuthConfigRequest {
    /**
     * API key credential; stored encrypted at rest.
     */
    api_key: string;

    type: 'api_key';
  }

  export interface BasicAuthConfigRequest {
    /**
     * Password credential; stored encrypted at rest.
     */
    password: string;

    type: 'basic';

    username: string;
  }

  export interface CRMConfig {
    /**
     * Field mappings applied when syncing CRM records into Retell contacts. Must
     * include phone_number, which is the field the two systems are matched on.
     */
    inbound_sync_mappings?: Array<CRMConfig.InboundSyncMapping>;

    /**
     * Field mappings applied when writing Retell contact changes back to the CRM.
     */
    outbound_sync_mappings?: Array<CRMConfig.OutboundSyncMapping>;

    /**
     * Whether to push call/chat activity to the external CRM. Opt-in — defaults to
     * false when unset.
     */
    sync_conversation_activity?: boolean;

    /**
     * Whether to create a CRM record after a conversation when the contact is not yet
     * linked to one.
     */
    sync_new_contacts?: boolean;
  }

  export namespace CRMConfig {
    export interface InboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }

    export interface OutboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }
  }
}

export interface AppUpdateParams {
  /**
   * Caller-managed credentials. Providers using the OAuth callback reject
   * auth_config and must be authorized through connect-app.
   */
  auth_config?:
    | AppUpdateParams.OAuthConfigRequest
    | AppUpdateParams.APIKeyAuthConfigRequest
    | AppUpdateParams.BasicAuthConfigRequest;

  crm_config?: AppUpdateParams.CRMConfig;

  name?: string;

  /**
   * Sub-account id, for providers that scope requests by a sub-account id on a
   * shared host.
   */
  tenant_id?: string;

  /**
   * Per-tenant API base URL.
   */
  tenant_url?: string;
}

export namespace AppUpdateParams {
  export interface OAuthConfigRequest {
    client_id: string;

    /**
     * Secret credential; stored encrypted at rest.
     */
    client_secret: string;

    type: 'oauth2';
  }

  export interface APIKeyAuthConfigRequest {
    /**
     * API key credential; stored encrypted at rest.
     */
    api_key: string;

    type: 'api_key';
  }

  export interface BasicAuthConfigRequest {
    /**
     * Password credential; stored encrypted at rest.
     */
    password: string;

    type: 'basic';

    username: string;
  }

  export interface CRMConfig {
    /**
     * Field mappings applied when syncing CRM records into Retell contacts. Must
     * include phone_number, which is the field the two systems are matched on.
     */
    inbound_sync_mappings?: Array<CRMConfig.InboundSyncMapping>;

    /**
     * Field mappings applied when writing Retell contact changes back to the CRM.
     */
    outbound_sync_mappings?: Array<CRMConfig.OutboundSyncMapping>;

    /**
     * Whether to push call/chat activity to the external CRM. Opt-in — defaults to
     * false when unset.
     */
    sync_conversation_activity?: boolean;

    /**
     * Whether to create a CRM record after a conversation when the contact is not yet
     * linked to one.
     */
    sync_new_contacts?: boolean;
  }

  export namespace CRMConfig {
    export interface InboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }

    export interface OutboundSyncMapping {
      /**
       * Field on the CRM's contact object to map to. A name that does not exist there
       * surfaces as an error on the sync job rather than at configuration time.
       */
      external_field_name: string;

      /**
       * Retell contact field, built-in or custom, to map. Types must be compatible with
       * the CRM field on both sides of the sync.
       */
      field_name: string;
    }
  }
}

export interface AppListParams {
  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;

  /**
   * Sort order for results.
   */
  sort_order?: 'ascending' | 'descending';
}

export interface AppDeleteParams {
  /**
   * Delete even when the App is still referenced.
   */
  force_delete?: boolean;
}

export interface AppListUsagesParams {
  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;

  /**
   * Sort order for results.
   */
  sort_order?: 'ascending' | 'descending';
}

export declare namespace App {
  export {
    type AppResponse as AppResponse,
    type AppListResponse as AppListResponse,
    type AppListUsagesResponse as AppListUsagesResponse,
    type AppTestAuthResponse as AppTestAuthResponse,
    type AppCreateParams as AppCreateParams,
    type AppUpdateParams as AppUpdateParams,
    type AppListParams as AppListParams,
    type AppDeleteParams as AppDeleteParams,
    type AppListUsagesParams as AppListUsagesParams,
  };
}
