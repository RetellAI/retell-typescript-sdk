// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Concurrency extends APIResource {
  /**
   * Get the current concurrency and concurrency limit of the org
   */
  retrieve(options?: RequestOptions): APIPromise<ConcurrencyRetrieveResponse> {
    return this._client.get('/get-concurrency', options);
  }
}

export interface ConcurrencyRetrieveResponse {
  /**
   * The free concurrency limit of the org.
   */
  base_concurrency?: number;

  /**
   * Whether burst concurrency mode is enabled. When enabled, allows the org to
   * exceed their normal concurrency limit with a surcharge.
   */
  concurrency_burst_enabled?: boolean;

  /**
   * The maximum concurrency limit when burst mode is enabled. This is calculated as
   * min(3x normal limit, normal limit + 300). Returns 0 if burst mode is disabled.
   */
  concurrency_burst_limit?: number;

  /**
   * The total concurrency limit (at max how many ongoing calls one can make) of the
   * org. This should be the sum of `base_concurrency` and `purchased_concurrency`.
   */
  concurrency_limit?: number;

  /**
   * The maximum amount of concurrency that the org can purchase.
   */
  concurrency_purchase_limit?: number;

  /**
   * The current concurrency (amount of ongoing calls) of the org.
   */
  current_concurrency?: number;

  /**
   * The amount of concurrency that the org has already purchased.
   */
  purchased_concurrency?: number;

  /**
   * The remaining amount of concurrency that the org can purchase. This is the
   * difference between `concurrency_purchase_limit` and `purchased_concurrency`.
   */
  remaining_purchase_limit?: number;
}

export declare namespace Concurrency {
  export { type ConcurrencyRetrieveResponse as ConcurrencyRetrieveResponse };
}
