// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Contact extends APIResource {
  /**
   * Create a new contact.
   *
   * @example
   * ```ts
   * const contactResponse = await client.contact.create({
   *   phone_number: 'phone_number',
   * });
   * ```
   */
  create(body: ContactCreateParams, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.post('/create-contact', { body, ...options });
  }

  /**
   * Update an existing contact.
   *
   * @example
   * ```ts
   * const contactResponse = await client.contact.update(
   *   'contact_id',
   * );
   * ```
   */
  update(
    contactID: string,
    body: ContactUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ContactResponse> {
    return this._client.patch(path`/update-contact/${contactID}`, { body, ...options });
  }

  /**
   * List contacts, newest created first by default, with the total count of matches
   * alongside the page. Page through results with `pagination_key`; `skip` is
   * available for offset-style paging but is slower on large contact sets and can
   * repeat or miss rows as contacts are added or deleted.
   *
   * @example
   * ```ts
   * const contacts = await client.contact.list();
   * ```
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
   *
   * @example
   * ```ts
   * await client.contact.delete('contact_id');
   * ```
   */
  delete(contactID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-contact/${contactID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Trigger a backfill job that re-applies analysis data mappings to contacts using
   * historical call and SMS chat data. Only one backfill job can run per
   * organization at a time. Select contact_memory to rewrite memory from matching
   * ended phone calls and SMS chats in chronological order, one conversation at a
   * time, with no conversation-count cap. Backfill starts with the contact's
   * existing memory. Each rewrite builds on the previous result, and the final
   * successful result is saved once per contact. When mapped analysis fields and
   * contact_memory are selected together, they are saved together in one contact
   * update. Memory rewrites use the currently stored contact fields.
   *
   * @example
   * ```ts
   * const response = await client.contact.backfillAnalysisData({
   *   backfill_attributes: ['contact_memory'],
   * });
   * ```
   */
  backfillAnalysisData(
    body: ContactBackfillAnalysisDataParams,
    options?: RequestOptions,
  ): APIPromise<ContactBackfillAnalysisDataResponse> {
    return this._client.post('/backfill-contact-analysis-data', { body, ...options });
  }

  /**
   * Start an incremental contact import from an uploaded CSV: creates new contacts
   * and updates existing ones matched by phone number. Mapped columns overwrite the
   * matched contact's fields; unmapped columns are ignored. Runs asynchronously —
   * poll get-contact-import for progress.
   *
   * @example
   * ```ts
   * const response = await client.contact.createImport({
   *   column_mapping: [
   *     {
   *       external_field_name: 'external_field_name',
   *       field_name: 'field_name',
   *     },
   *   ],
   *   upload_id: 'upload_26f1cbdf5713',
   * });
   * ```
   */
  createImport(
    body: ContactCreateImportParams,
    options?: RequestOptions,
  ): APIPromise<ContactCreateImportResponse> {
    return this._client.post('/create-contact-import', { body, ...options });
  }

  /**
   * Retrieve a contact by ID.
   *
   * @example
   * ```ts
   * const contactResponse = await client.contact.get(
   *   'contact_id',
   * );
   * ```
   */
  get(contactID: string, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.get(path`/get-contact/${contactID}`, options);
  }

  /**
   * Get the status of the contact analysis data backfill job.
   *
   * @example
   * ```ts
   * const response =
   *   await client.contact.getBackfillJobStatus();
   * ```
   */
  getBackfillJobStatus(options?: RequestOptions): APIPromise<ContactGetBackfillJobStatusResponse> {
    return this._client.get('/get-backfill-contact-job-status', options);
  }

  /**
   * Retrieve a contact by phone number. At most one contact exists per phone number
   * in an organization.
   *
   * @example
   * ```ts
   * const contactResponse = await client.contact.getByPhone(
   *   'phone_number',
   * );
   * ```
   */
  getByPhone(phoneNumber: string, options?: RequestOptions): APIPromise<ContactResponse> {
    return this._client.get(path`/get-contact-by-phone/${phoneNumber}`, options);
  }

  /**
   * Status and counts for the org's current or latest contact import.
   *
   * @example
   * ```ts
   * const response = await client.contact.getImport();
   * ```
   */
  getImport(options?: RequestOptions): APIPromise<ContactGetImportResponse> {
    return this._client.get('/get-contact-import', options);
  }

  /**
   * List a contact's conversations (inbound calls, outbound calls, and chats) merged
   * into a single timeline, most recent first. Results are matched by the contact's
   * phone number. Use the returned `pagination_key` to fetch the next page.
   *
   * @example
   * ```ts
   * const response = await client.contact.listConversations(
   *   'contact_id',
   * );
   * ```
   */
  listConversations(
    contactID: string,
    query: ContactListConversationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListConversationsResponse> {
    return this._client.get(path`/list-contact-conversations/${contactID}`, { query, ...options });
  }

  /**
   * Upload a CSV file for a contact import. The file is stored privately and
   * referenced by the returned upload_id in create-contact-import.
   *
   * @example
   * ```ts
   * const response = await client.contact.uploadImportFile({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  uploadImportFile(
    body: ContactUploadImportFileParams,
    options?: RequestOptions,
  ): APIPromise<ContactUploadImportFileResponse> {
    return this._client.post(
      '/upload-contact-import-file',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
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
   * Running brief shared across this contact's phone calls and SMS chats. Omitted
   * when unset.
   */
  contact_memory?: string;

  /**
   * Assigned tag IDs and labels from the organization's CRM config. IDs absent from
   * the config are omitted.
   */
  contact_tags?: Array<ContactResponse.ContactTag>;

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

export namespace ContactResponse {
  export interface ContactTag {
    /**
     * Unique identifier for the tag.
     */
    id: string;

    /**
     * Human-readable label for the tag.
     */
    label: string;
  }
}

export interface ContactListResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<ContactResponse>;

  /**
   * Pagination key for the next page.
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

export interface ContactCreateImportResponse {
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

export interface ContactGetImportResponse {
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
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<ContactListConversationsResponse.ContactCall | ContactListConversationsResponse.ContactChat>;

  /**
   * Pagination key for the next page.
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

export interface ContactUploadImportFileResponse {
  file_name?: string;

  upload_id?: string;
}

export interface ContactCreateParams {
  /**
   * Phone number of the contact.
   */
  phone_number: string;

  /**
   * Contact memory text.
   */
  contact_memory?: string | null;

  /**
   * Full set of tag IDs for the contact.
   */
  contact_tag_ids?: Array<string>;

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
   * Contact memory text. Pass null to clear.
   */
  contact_memory?: string | null;

  /**
   * Full replacement set of tag IDs for the contact.
   */
  contact_tag_ids?: Array<string>;

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
   * Contact IDs to leave out of both the results and `total`.
   */
  excluded_contact_ids?: Array<string>;

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
   * Sort contacts by `created_timestamp` in ascending or descending order (newest
   * first by default). Ties are broken by contact ID in the same direction.
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
     * Match contacts that have any of the listed tag IDs.
     */
    contact_tag_ids?: FilterCriteria.ContactTagIDs;

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

    /**
     * Match contacts that have any of the listed tag IDs.
     */
    export interface ContactTagIDs {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<string>;
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
   * have an analysis data mapping configured, except for the built-in contact_memory
   * attribute, which requires no mapping and supports requests on its own or
   * alongside mapped fields. Memory backfill skips conversations without retained
   * transcripts.
   */
  backfill_attributes: Array<string>;

  /**
   * Optional filter to scope which conversations are processed. Supports agent and
   * start_timestamp from the standard call filter. The same filter applies to phone
   * calls and SMS chats for both analysis data mappings and contact_memory.
   */
  backfill_call_filter?: ContactBackfillAnalysisDataParams.BackfillCallFilter;
}

export namespace ContactBackfillAnalysisDataParams {
  /**
   * Optional filter to scope which conversations are processed. Supports agent and
   * start_timestamp from the standard call filter. The same filter applies to phone
   * calls and SMS chats for both analysis data mappings and contact_memory.
   */
  export interface BackfillCallFilter {
    /**
     * Filter conversations by agent. Agents are OR-connected.
     */
    agent?: Array<BackfillCallFilter.Agent>;

    /**
     * Filter conversations by start timestamp (epoch ms).
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
       * Specific versions to filter on. If omitted or empty, all versions are included.
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

export interface ContactCreateImportParams {
  /**
   * CSV headers mapped to contact fields. field_name is the contact field and
   * external_field_name is the CSV header. Exactly one mapping must target
   * phone_number. Unmapped columns are ignored.
   */
  column_mapping: Array<ContactCreateImportParams.ColumnMapping>;

  /**
   * Id returned by upload-contact-import-file.
   */
  upload_id: string;

  /**
   * Tag labels added to every contact in this import. Labels are trimmed and
   * deduplicated. New labels are added to the org's CRM config with generated tag
   * IDs.
   */
  contact_tags?: Array<string>;

  /**
   * Country for parsing phone numbers without a country code. Defaults to US.
   */
  default_country?: string;
}

export namespace ContactCreateImportParams {
  export interface ColumnMapping {
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

export interface ContactUploadImportFileParams {
  file: Uploadable;
}

export declare namespace Contact {
  export {
    type ContactResponse as ContactResponse,
    type ContactListResponse as ContactListResponse,
    type ContactBackfillAnalysisDataResponse as ContactBackfillAnalysisDataResponse,
    type ContactCreateImportResponse as ContactCreateImportResponse,
    type ContactGetBackfillJobStatusResponse as ContactGetBackfillJobStatusResponse,
    type ContactGetImportResponse as ContactGetImportResponse,
    type ContactListConversationsResponse as ContactListConversationsResponse,
    type ContactUploadImportFileResponse as ContactUploadImportFileResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactBackfillAnalysisDataParams as ContactBackfillAnalysisDataParams,
    type ContactCreateImportParams as ContactCreateImportParams,
    type ContactListConversationsParams as ContactListConversationsParams,
    type ContactUploadImportFileParams as ContactUploadImportFileParams,
  };
}
