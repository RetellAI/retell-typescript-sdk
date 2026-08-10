// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Identity extends APIResource {
  /**
   * Get info about the API key used to authenticate, and the org that owns it.
   */
  retrieve(options?: RequestOptions): APIPromise<IdentityRetrieveResponse> {
    return this._client.get('/get-api-key-info', options);
  }
}

export interface IdentityRetrieveResponse {
  /**
   * Display name of the API key used, if it has one.
   */
  api_key_name: string | null;

  /**
   * Unique id of the org that owns the API key.
   */
  org_id: string;

  /**
   * Display name of the org.
   */
  org_name: string;
}

export declare namespace Identity {
  export { type IdentityRetrieveResponse as IdentityRetrieveResponse };
}
