// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Concurrency extends APIResource {
  /**
   * Get the current concurrency and concurrency limit of the user
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<ConcurrencyRetrieveResponse> {
    return this._client.get('/get-concurrency', options);
  }
}

export interface ConcurrencyRetrieveResponse {
  /**
   * The concurrency limit of the user.
   */
  concurrency_limit?: number;

  /**
   * The current concurrency of the user.
   */
  current_concurrency?: number;
}

export declare namespace Concurrency {
  export { type ConcurrencyRetrieveResponse as ConcurrencyRetrieveResponse };
}
