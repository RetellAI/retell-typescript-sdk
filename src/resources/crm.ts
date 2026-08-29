// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class CRM extends APIResource {
  /**
   * Get the organization's CRM configuration: which CRM app is linked, the custom
   * contact fields defined for it, and how Post Call Extraction data is written back
   * to contacts. Returns an empty configuration when nothing has been set up yet.
   */
  getConfig(options?: RequestOptions): APIPromise<CRMConfig> {
    return this._client.get('/get-crm-config', options);
  }

  /**
   * Get the contact schema of the connected CRM: the fields available on its contact
   * object, which are the values that sync mappings can reference.
   */
  getSchema(
    query: CRMGetSchemaParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CRMGetSchemaResponse> {
    return this._client.get('/get-crm-schema', { query, ...options });
  }

  /**
   * Get the status of the organization's contact sync, whether it was started
   * manually or by the schedule. Returns status `idle` when no sync is running.
   */
  getSyncJobStatus(options?: RequestOptions): APIPromise<CRMGetSyncJobStatusResponse> {
    return this._client.get('/get-sync-job-status', options);
  }

  /**
   * Start a contact sync with the linked CRM app immediately, instead of waiting for
   * the scheduled sync. One sync runs per organization at a time: starting another
   * while one is in flight is rejected. Poll get-sync-job-status for progress.
   */
  runSyncJob(options?: RequestOptions): APIPromise<CRMRunSyncJobResponse> {
    return this._client.post('/run-sync-job', options);
  }

  /**
   * Update the organization's CRM configuration. Omitted fields stay as they are; a
   * field that is sent replaces its stored value in full.
   */
  updateConfig(body: CRMUpdateConfigParams, options?: RequestOptions): APIPromise<CRMConfig> {
    return this._client.post('/update-crm-config', { body, ...options });
  }
}

export interface CRMConfig {
  org_id: string;

  /**
   * The connected CRM integration app ID.
   */
  app_id?: string;

  /**
   * Preferred display order of contact fields, for clients that render contacts as a
   * table. Not used by the API itself.
   */
  contact_columns_order?: Array<string>;

  crm_analysis_data_mappings?: Array<CRMConfig.CRMAnalysisDataMapping>;

  custom_fields?: Array<CRMConfig.CustomField>;

  /**
   * Epoch milliseconds of the last successful sync.
   */
  last_sync_timestamp?: number;
}

export namespace CRMConfig {
  export interface CRMAnalysisDataMapping {
    /**
     * Name of the Post Call Extraction field to read the value from. A value that does
     * not match the contact field's type is skipped rather than failing the
     * conversation.
     */
    analysis_data_name: string;

    /**
     * Contact field to write to. Must be an existing built-in or custom contact field,
     * and cannot be phone_number, which identifies the contact.
     */
    field_name: string;

    /**
     * How to reconcile the new value with what the contact already holds. `overwrite`
     * always replaces it, `fill_if_empty` writes only when the field is empty, and
     * `merge` combines the existing text with the new value. `merge` is available on
     * string fields only.
     */
    update_mode: 'overwrite' | 'fill_if_empty' | 'merge';
  }

  export interface CustomField {
    name: string;

    type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'enum';

    description?: string;

    /**
     * Display label for the field.
     */
    label?: string;

    /**
     * Allowed values. Required when `type` is `enum`, where a value is rejected unless
     * it appears here; ignored for every other type.
     */
    options?: Array<string>;
  }
}

export interface CRMGetSchemaResponse {
  fields: Array<CRMGetSchemaResponse.Field>;

  /**
   * CRM provider name.
   */
  provider: string;
}

export namespace CRMGetSchemaResponse {
  export interface Field {
    name: string;

    type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'enum';

    description?: string;

    /**
     * Display label for the field.
     */
    label?: string;

    /**
     * Allowed values. Required when `type` is `enum`, where a value is rejected unless
     * it appears here; ignored for every other type.
     */
    options?: Array<string>;
  }
}

export interface CRMGetSyncJobStatusResponse {
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

export interface CRMRunSyncJobResponse {
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

export interface CRMGetSchemaParams {
  /**
   * ID of the CRM app to read the schema from. Defaults to the app linked in the
   * organization's CRM configuration. Naming a different app additionally requires
   * the App.Read scope.
   */
  app_id?: string;
}

export interface CRMUpdateConfigParams {
  /**
   * ID of the CRM app to link. Pass null to unlink, which stops syncing. Changing it
   * resets the sync cursor, so the next sync re-reads every contact from the new
   * CRM.
   */
  app_id?: string | null;

  /**
   * Preferred display order of contact fields, for clients that render contacts as a
   * table. Not used by the API itself.
   */
  contact_columns_order?: Array<string>;

  /**
   * Replaces the stored list.
   */
  crm_analysis_data_mappings?: Array<CRMUpdateConfigParams.CRMAnalysisDataMapping>;

  /**
   * Replaces the stored list. Names must be snake_case and cannot collide with a
   * built-in contact field or start with `contact`/`external`. Removing a field that
   * an analysis data mapping still targets is rejected — send
   * crm_analysis_data_mappings in the same request to retarget or drop those
   * mappings.
   */
  custom_fields?: Array<CRMUpdateConfigParams.CustomField>;
}

export namespace CRMUpdateConfigParams {
  export interface CRMAnalysisDataMapping {
    /**
     * Name of the Post Call Extraction field to read the value from. A value that does
     * not match the contact field's type is skipped rather than failing the
     * conversation.
     */
    analysis_data_name: string;

    /**
     * Contact field to write to. Must be an existing built-in or custom contact field,
     * and cannot be phone_number, which identifies the contact.
     */
    field_name: string;

    /**
     * How to reconcile the new value with what the contact already holds. `overwrite`
     * always replaces it, `fill_if_empty` writes only when the field is empty, and
     * `merge` combines the existing text with the new value. `merge` is available on
     * string fields only.
     */
    update_mode: 'overwrite' | 'fill_if_empty' | 'merge';
  }

  export interface CustomField {
    name: string;

    type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'enum';

    description?: string;

    /**
     * Display label for the field.
     */
    label?: string;

    /**
     * Allowed values. Required when `type` is `enum`, where a value is rejected unless
     * it appears here; ignored for every other type.
     */
    options?: Array<string>;
  }
}

export declare namespace CRM {
  export {
    type CRMConfig as CRMConfig,
    type CRMGetSchemaResponse as CRMGetSchemaResponse,
    type CRMGetSyncJobStatusResponse as CRMGetSyncJobStatusResponse,
    type CRMRunSyncJobResponse as CRMRunSyncJobResponse,
    type CRMGetSchemaParams as CRMGetSchemaParams,
    type CRMUpdateConfigParams as CRMUpdateConfigParams,
  };
}
