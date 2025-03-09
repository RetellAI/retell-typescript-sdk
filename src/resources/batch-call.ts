// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class BatchCall extends APIResource {
  /**
   * Create a batch call
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
     * Add optional dynamic variables in key value pairs of string that injects into
     * your Response Engine prompt and tool description. Only applicable for Response
     * Engine.
     */
    retell_llm_dynamic_variables?: Record<string, unknown>;
  }
}

export declare namespace BatchCall {
  export {
    type BatchCallResponse as BatchCallResponse,
    type BatchCallCreateBatchCallParams as BatchCallCreateBatchCallParams,
  };
}
