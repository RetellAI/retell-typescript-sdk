// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class BatchCall extends APIResource {
  /**
   * Create a batch call
   *
   * @example
   * ```ts
   * const batchCallResponse =
   *   await client.batchCall.createBatchCall({
   *     from_number: '+14157774444',
   *     tasks: [{ to_number: '+12137774445' }],
   *   });
   * ```
   */
  createBatchCall(
    body: BatchCallCreateBatchCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BatchCallResponse> {
    return this._client.post('/create-batch-call', { body, ...options });
  }
}

export interface BatchCallResponse {
  /**
   * Unique id of the batch call.
   */
  batch_call_id: string;

  from_number: string;

  name: string;

  scheduled_timestamp: number;

  /**
   * Number of tasks within the batch call
   */
  total_task_count: number;
}

export interface BatchCallCreateBatchCallParams {
  /**
   * The number you own in E.164 format. Must be a number purchased from Retell or
   * imported to Retell.
   */
  from_number: string;

  /**
   * A list of individual call tasks to be executed as part of the batch call. Each
   * task represents a single outbound call and includes details such as the
   * recipient's phone number and optional dynamic variables to personalize the call
   * content.
   */
  tasks: Array<BatchCallCreateBatchCallParams.Task>;

  /**
   * The name of the batch call. Only used for your own reference.
   */
  name?: string;

  /**
   * The scheduled time for sending the batch call, represented as a Unix timestamp
   * in milliseconds. If omitted, the call will be sent immediately.
   */
  trigger_timestamp?: number;
}

export namespace BatchCallCreateBatchCallParams {
  export interface Task {
    /**
     * The The number you want to call, in E.164 format. If using a number purchased
     * from Retell, only US numbers are supported as destination.
     */
    to_number: string;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;

    /**
     * For this particular call, override the agent used with this agent id. This does
     * not bind the agent to this number, this is for one time override.
     */
    override_agent_id?: string;

    /**
     * For this particular call, override the agent version used with this version.
     * This does not bind the agent to this number, this is for one time override.
     */
    override_agent_version?: number;

    /**
     * Add optional dynamic variables in key value pairs of string that injects into
     * your Response Engine prompt and tool description. Only applicable for Response
     * Engine.
     */
    retell_llm_dynamic_variables?: { [key: string]: unknown };
  }
}

export declare namespace BatchCall {
  export {
    type BatchCallResponse as BatchCallResponse,
    type BatchCallCreateBatchCallParams as BatchCallCreateBatchCallParams,
  };
}
