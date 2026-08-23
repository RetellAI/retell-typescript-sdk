// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Contact extends APIResource {
  /**
   * Create a new contact.
   */
  create(body: ContactCreateParams, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.post('/create-contact', { body, ...options });
  }

  /**
   * Update an existing contact.
   */
  update(
    contactID: string,
    body: ContactUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ContactResponse> {
    return this._client.patch(path`/update-contact/${contactID}`, { body, ...options });
  }

  /**
   * List contacts, newest conversation first by default, with the total count of
   * matches alongside the page. Page through results with `pagination_key`; `skip`
   * is available for offset-style paging but is slower on large contact sets and can
   * repeat or miss rows as contacts are updated.
   */
  list(
    body: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.post('/list-contacts', { body, ...options });
  }

  /**
   * Delete a contact. A contact linked to a record in a connected CRM cannot be
   * deleted while two-way sync is active — unlink the CRM app first, otherwise the
   * next sync would recreate it.
   */
  delete(contactID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-contact/${contactID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Trigger a backfill job that re-applies analysis data mappings to contacts using
   * historical call data. Only one backfill job can run per organization at a time.
   */
  backfillAnalysisData(
    body: ContactBackfillAnalysisDataParams,
    options?: RequestOptions,
  ): APIPromise<ContactBackfillAnalysisDataResponse> {
    return this._client.post('/backfill-contact-analysis-data', { body, ...options });
  }

  /**
   * Retrieve a contact by ID.
   */
  get(contactID: string, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.get(path`/get-contact/${contactID}`, options);
  }

  /**
   * Get the status of the contact analysis data backfill job.
   */
  getBackfillJobStatus(options?: RequestOptions): APIPromise<ContactGetBackfillJobStatusResponse> {
    return this._client.get('/get-backfill-contact-job-status', options);
  }

  /**
   * Retrieve a contact by phone number. At most one contact exists per phone number
   * in an organization.
   */
  getByPhone(phoneNumber: string, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.get(path`/get-contact-by-phone/${phoneNumber}`, options);
  }

  /**
   * List a contact's conversations (inbound calls, outbound calls, and chats) merged
   * into a single timeline, most recent first. Results are matched by the contact's
   * phone number. Use the returned `pagination_key` to fetch the next page.
   */
  listConversations(
    contactID: string,
    query: ContactListConversationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListConversationsResponse> {
    return this._client.get(path`/list-contact-conversations/${contactID}`, { query, ...options });
  }
}

export interface ContactResponse {
  /**
   * Unique identifier for the contact.
   */
  contact_id: string;

  /**
   * Epoch milliseconds when the contact was created.
   */
  created_timestamp: number;

  /**
   * Organization this contact belongs to.
   */
  org_id: string;

  /**
   * Phone number of the contact.
   */
  phone_number: string;

  /**
   * Number of conversations (calls and chats) associated with this contact.
   */
  conversation_count?: number;

  /**
   * Custom fields defined in CRM config.
   */
  custom_fields?: unknown;

  /**
   * Whether this contact should not be called.
   */
  do_not_call?: boolean;

  /**
   * CRM record ID from the external provider.
   */
  external_id?: string;

  /**
   * First name of the contact.
   */
  first_name?: string;

  /**
   * Epoch milliseconds of the most recent conversation with this contact.
   */
  last_conversation_timestamp?: number;

  /**
   * Last name of the contact.
   */
  last_name?: string;

  /**
   * Epoch milliseconds when the contact was last modified.
   */
  user_modified_timestamp?: number;
}

export interface ContactListResponse {
  has_more?: boolean;

  items?: Array<ContactResponse>;

  /**
   * Base64url-encoded pagination key for the next page.
   */
  pagination_key?: string;

  /**
   * Total count of contacts matching the filter.
   */
  total?: number;
}

export interface ContactBackfillAnalysisDataResponse {
  status: 'queued' | 'running' | 'idle';

  /**
   * Number of items that errored so far.
   */
  failed?: number;

  /**
   * Epoch milliseconds when the job started.
   */
  start_timestamp?: number;

  /**
   * Number of items processed successfully so far.
   */
  succeeded?: number;

  /**
   * Whether the job was started by an explicit API call (`manual`) or by the
   * scheduled sync (`cron`).
   */
  triggered_by?: 'manual' | 'cron';
}

export interface ContactGetBackfillJobStatusResponse {
  status: 'queued' | 'running' | 'idle';

  /**
   * Number of items that errored so far.
   */
  failed?: number;

  /**
   * Epoch milliseconds when the job started.
   */
  start_timestamp?: number;

  /**
   * Number of items processed successfully so far.
   */
  succeeded?: number;

  /**
   * Whether the job was started by an explicit API call (`manual`) or by the
   * scheduled sync (`cron`).
   */
  triggered_by?: 'manual' | 'cron';
}

export interface ContactListConversationsResponse {
  /**
   * Whether more conversations exist beyond the returned window.
   */
  has_more?: boolean;

  items?: Array<ContactListConversationsResponse.ContactCall | ContactListConversationsResponse.ContactChat>;

  /**
   * Base64url-encoded pagination key. Pass as `pagination_key` query parameter to
   * fetch the next page.
   */
  pagination_key?: string;
}

export namespace ContactListConversationsResponse {
  export interface ContactCall {
    call_id: string;

    type: 'call';

    /**
     * Direction of the call.
     */
    direction?: 'inbound' | 'outbound';

    /**
     * Reason the call ended.
     */
    disconnection_reason?: string;

    /**
     * Duration of the call in milliseconds.
     */
    duration_ms?: number;

    /**
     * User sentiment from post-call analysis.
     */
    sentiment?: 'Negative' | 'Positive' | 'Neutral' | 'Unknown';

    /**
     * Epoch milliseconds when the call started.
     */
    start_timestamp?: number;

    /**
     * Whether the call was deemed successful by post-call analysis.
     */
    successful?: boolean;

    /**
     * Post-call analysis summary.
     */
    summary?: string;
  }

  export interface ContactChat {
    chat_id: string;

    type: 'chat';

    /**
     * Direction of the chat.
     */
    direction?: 'inbound' | 'outbound';

    /**
     * Reason the chat ended.
     */
    disconnection_reason?: string;

    /**
     * Duration of the chat in milliseconds.
     */
    duration_ms?: number;

    /**
     * User sentiment from post-chat analysis.
     */
    sentiment?: 'Negative' | 'Positive' | 'Neutral' | 'Unknown';

    /**
     * Epoch milliseconds when the chat started.
     */
    start_timestamp?: number;

    /**
     * Whether the chat was deemed successful by post-chat analysis.
     */
    successful?: boolean;

    /**
     * Post-chat analysis summary.
     */
    summary?: string;
  }
}

export interface ContactCreateParams {
  /**
   * Phone number of the contact.
   */
  phone_number: string;

  /**
   * Values must match the types defined in CRM config custom fields. Set a value to
   * null to clear it.
   */
  custom_fields?: unknown;

  do_not_call?: boolean;

  /**
   * First name of the contact.
   */
  first_name?: string;

  /**
   * Last name of the contact.
   */
  last_name?: string;
}

export interface ContactUpdateParams {
  /**
   * Values must match the types defined in CRM config custom fields. Set a value to
   * null to clear it.
   */
  custom_fields?: unknown;

  do_not_call?: boolean;

  /**
   * First name of the contact.
   */
  first_name?: string;

  /**
   * Last name of the contact.
   */
  last_name?: string;
}

export interface ContactListParams {
  /**
   * Filter criteria for contacts. All conditions are implicitly connected with AND.
   * first_name and last_name are not filterable here; use search_query to match on
   * those.
   */
  filter_criteria?: ContactListParams.FilterCriteria;

  /**
   * Maximum number of contacts to return.
   */
  limit?: number;

  /**
   * Base64url-encoded pagination key from a previous response.
   */
  pagination_key?: string;

  /**
   * Case-insensitive substring match against phone number, first name, last name,
   * external ID, and custom field values. This is the only way to match on a
   * contact's name.
   */
  search_query?: string;

  /**
   * Number of records to skip for offset-based pagination.
   */
  skip?: number;

  /**
   * Sort contacts by `last_conversation_timestamp` in ascending or descending order.
   * Contacts that have never been contacted sort as if their timestamp were 0.
   */
  sort_order?: 'asc' | 'desc';
}

export namespace ContactListParams {
  /**
   * Filter criteria for contacts. All conditions are implicitly connected with AND.
   * first_name and last_name are not filterable here; use search_query to match on
   * those.
   */
  export interface FilterCriteria {
    contact_id?: FilterCriteria.ContactID;

    /**
     * Filter by custom contact fields defined in CRM config.
     */
    custom_fields?: Array<
      | FilterCriteria.StringFilter
      | FilterCriteria.NumberFilter
      | FilterCriteria.BooleanFilter
      | FilterCriteria.RangeFilter
      | FilterCriteria.EnumFilter
      | FilterCriteria.PresentFilter
    >;

    /**
     * Filter by whether the contact is marked do-not-call.
     */
    do_not_call?: FilterCriteria.DoNotCall;

    /**
     * Filter by the record id in the connected CRM. Use a `present` filter to separate
     * synced from unsynced contacts.
     */
    external_id?: FilterCriteria.StringFilter | FilterCriteria.PresentFilter;

    /**
     * Filter by when the contact was last spoken to, in epoch milliseconds.
     */
    last_conversation_timestamp?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by phone number. Stored in E.164, so an `eq` filter needs the full
     * number.
     */
    phone_number?: FilterCriteria.PhoneNumber;
  }

  export namespace FilterCriteria {
    export interface ContactID {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface StringFilter {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface BooleanFilter {
      op: 'eq';

      type: 'boolean';

      value: boolean;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface EnumFilter {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<string>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface PresentFilter {
      /**
       * pr: present (has value), np: not present
       */
      op: 'pr' | 'np';

      type: 'present';

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    /**
     * Filter by whether the contact is marked do-not-call.
     */
    export interface DoNotCall {
      op: 'eq';

      type: 'boolean';

      value: boolean;
    }

    export interface StringFilter {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface PresentFilter {
      /**
       * pr: present (has value), np: not present
       */
      op: 'pr' | 'np';

      type: 'present';
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }

    /**
     * Filter by phone number. Stored in E.164, so an `eq` filter needs the full
     * number.
     */
    export interface PhoneNumber {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }
  }
}

export interface ContactBackfillAnalysisDataParams {
  /**
   * Contact fields to recompute. Each one must still exist as a contact field and
   * have an analysis data mapping configured, otherwise the request is rejected
   * rather than running a job that writes nothing.
   */
  backfill_attributes: Array<string>;

  /**
   * Optional call filter to scope which calls are processed. Supports agent and
   * start_timestamp from the standard call filter.
   */
  backfill_call_filter?: ContactBackfillAnalysisDataParams.BackfillCallFilter;
}

export namespace ContactBackfillAnalysisDataParams {
  /**
   * Optional call filter to scope which calls are processed. Supports agent and
   * start_timestamp from the standard call filter.
   */
  export interface BackfillCallFilter {
    /**
     * Filter calls by agent. Agents are OR-connected.
     */
    agent?: Array<BackfillCallFilter.Agent>;

    /**
     * Filter calls by start timestamp (epoch ms).
     */
    start_timestamp?: BackfillCallFilter.NumberFilter | BackfillCallFilter.RangeFilter;
  }

  export namespace BackfillCallFilter {
    export interface Agent {
      /**
       * The agent ID to filter on.
       */
      agent_id: string;

      /**
       * Specific versions to filter on. If not provided, all versions are included.
       */
      version?: Array<number>;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }
  }
}

export interface ContactListConversationsParams {
  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;
}

export declare namespace Contact {
  export {
    type ContactResponse as ContactResponse,
    type ContactListResponse as ContactListResponse,
    type ContactBackfillAnalysisDataResponse as ContactBackfillAnalysisDataResponse,
    type ContactGetBackfillJobStatusResponse as ContactGetBackfillJobStatusResponse,
    type ContactListConversationsResponse as ContactListConversationsResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactBackfillAnalysisDataParams as ContactBackfillAnalysisDataParams,
    type ContactListConversationsParams as ContactListConversationsParams,
  };
}
