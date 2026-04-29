// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ExportRequest extends APIResource {
  /**
   * List export requests with pagination
   */
  list(
    query: ExportRequestListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExportRequestListResponse> {
    return this._client.get('/v2/list-export-requests', { query, ...options });
  }
}

export interface ExportRequestListResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<ExportRequestListResponse.Item>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export namespace ExportRequestListResponse {
  export interface Item {
    channel?: 'call' | 'chat';

    created_timestamp?: number;

    export_request_id?: string;

    status?: 'created' | 'processing' | 'completed' | 'error';

    timezone?: string;

    url?: string;
  }
}

export interface ExportRequestListParams {
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

export declare namespace ExportRequest {
  export {
    type ExportRequestListResponse as ExportRequestListResponse,
    type ExportRequestListParams as ExportRequestListParams,
  };
}
