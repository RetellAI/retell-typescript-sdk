// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Tests extends APIResource {
  /**
   * Create a batch test to run multiple test cases
   */
  createBatchTest(
    body: TestCreateBatchTestParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BatchTestResponse> {
    return this._client.post('/create-batch-test', { body, ...options });
  }
}

export interface BatchTestResponse {
  /**
   * Timestamp when the batch job was created (milliseconds since epoch)
   */
  creation_timestamp: number;

  /**
   * Number of test cases that encountered errors
   */
  error_count: number;

  /**
   * Number of test cases that failed
   */
  fail_count: number;

  /**
   * Number of test cases that passed
   */
  pass_count: number;

  response_engine:
    | BatchTestResponse.ResponseEngineRetellLm
    | BatchTestResponse.ResponseEngineCustomLm
    | BatchTestResponse.ResponseEngineConversationFlow;

  /**
   * Status of the batch job
   */
  status: 'in_progress' | 'complete';

  /**
   * Unique identifier for the test case batch job
   */
  test_case_batch_job_id: string;

  /**
   * Total number of test cases in the batch
   */
  total_count: number;

  /**
   * Timestamp when the batch job was last modified (milliseconds since epoch)
   */
  user_modified_timestamp: number;
}

export namespace BatchTestResponse {
  export interface ResponseEngineRetellLm {
    /**
     * id of the Retell LLM Response Engine.
     */
    llm_id: string;

    /**
     * type of the Response Engine.
     */
    type: 'retell-llm';

    /**
     * Version of the Retell LLM Response Engine.
     */
    version?: number | null;
  }

  export interface ResponseEngineCustomLm {
    /**
     * LLM websocket url of the custom LLM.
     */
    llm_websocket_url: string;

    /**
     * type of the Response Engine.
     */
    type: 'custom-llm';
  }

  export interface ResponseEngineConversationFlow {
    /**
     * ID of the Conversation Flow Response Engine.
     */
    conversation_flow_id: string;

    /**
     * type of the Response Engine.
     */
    type: 'conversation-flow';

    /**
     * Version of the Conversation Flow Response Engine.
     */
    version?: number | null;
  }
}

export interface TestCreateBatchTestParams {
  /**
   * Response engine to use for the test cases. Custom LLM is not supported.
   */
  response_engine:
    | TestCreateBatchTestParams.ResponseEngineRetellLm
    | TestCreateBatchTestParams.ResponseEngineConversationFlow;

  /**
   * Array of test case definition IDs to run
   */
  test_case_definition_ids: Array<string>;

  /**
   * Reserve a portion of your org concurrency for batch processing.
   */
  reserved_concurrency?: number;
}

export namespace TestCreateBatchTestParams {
  export interface ResponseEngineRetellLm {
    /**
     * id of the Retell LLM Response Engine.
     */
    llm_id: string;

    /**
     * type of the Response Engine.
     */
    type: 'retell-llm';

    /**
     * Version of the Retell LLM Response Engine.
     */
    version?: number | null;
  }

  export interface ResponseEngineConversationFlow {
    /**
     * ID of the Conversation Flow Response Engine.
     */
    conversation_flow_id: string;

    /**
     * type of the Response Engine.
     */
    type: 'conversation-flow';

    /**
     * Version of the Conversation Flow Response Engine.
     */
    version?: number | null;
  }
}

export declare namespace Tests {
  export {
    type BatchTestResponse as BatchTestResponse,
    type TestCreateBatchTestParams as TestCreateBatchTestParams,
  };
}
