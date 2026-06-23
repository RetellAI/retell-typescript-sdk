// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tests extends APIResource {
  /**
   * Create a new test case definition
   */
  createTestCaseDefinition(
    body: TestCreateTestCaseDefinitionParams,
    options?: RequestOptions,
  ): APIPromise<TestCaseDefinitionResponse> {
    return this._client.post('/create-test-case-definition', { body, ...options });
  }

  /**
   * Get a test case definition by ID
   */
  getTestCaseDefinition(
    testCaseDefinitionID: string,
    options?: RequestOptions,
  ): APIPromise<TestCaseDefinitionResponse> {
    return this._client.get(path`/get-test-case-definition/${testCaseDefinitionID}`, options);
  }

  /**
   * List test case definitions with pagination
   */
  listTestCaseDefinitions(
    query: TestListTestCaseDefinitionsParams,
    options?: RequestOptions,
  ): APIPromise<TestListTestCaseDefinitionsResponse> {
    return this._client.get('/v2/list-test-case-definitions', { query, ...options });
  }

  /**
   * Update a test case definition
   */
  updateTestCaseDefinition(
    testCaseDefinitionID: string,
    body: TestUpdateTestCaseDefinitionParams,
    options?: RequestOptions,
  ): APIPromise<TestCaseDefinitionResponse> {
    return this._client.put(path`/update-test-case-definition/${testCaseDefinitionID}`, { body, ...options });
  }

  /**
   * Delete a test case definition
   */
  deleteTestCaseDefinition(testCaseDefinitionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-test-case-definition/${testCaseDefinitionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a batch test to run multiple test cases
   */
  createBatchTest(body: TestCreateBatchTestParams, options?: RequestOptions): APIPromise<BatchTestResponse> {
    return this._client.post('/create-batch-test', { body, ...options });
  }

  /**
   * Get a batch test job by ID
   */
  getBatchTest(testCaseBatchJobID: string, options?: RequestOptions): APIPromise<BatchTestResponse> {
    return this._client.get(path`/get-batch-test/${testCaseBatchJobID}`, options);
  }

  /**
   * List batch test jobs with pagination
   */
  listBatchTests(
    query: TestListBatchTestsParams,
    options?: RequestOptions,
  ): APIPromise<TestListBatchTestsResponse> {
    return this._client.get('/v2/list-batch-tests', { query, ...options });
  }

  /**
   * Get a test case job (test run) by ID
   */
  getTestRun(testCaseJobID: string, options?: RequestOptions): APIPromise<TestCaseJobResponse> {
    return this._client.get(path`/get-test-run/${testCaseJobID}`, options);
  }

  /**
   * List test case jobs (test runs) for a batch test job with pagination
   */
  listTestRuns(
    testCaseBatchJobID: string,
    query: TestListTestRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TestListTestRunsResponse> {
    return this._client.get(path`/v2/list-test-runs/${testCaseBatchJobID}`, { query, ...options });
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

export interface TestCaseDefinitionResponse {
  /**
   * Timestamp when the test case definition was created (milliseconds since epoch)
   */
  creation_timestamp: number;

  /**
   * Dynamic variables to inject into the response engine
   */
  dynamic_variables: { [key: string]: string };

  /**
   * LLM model to use for simulation
   */
  llm_model:
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'gpt-5'
    | 'gpt-5-mini'
    | 'gpt-5-nano'
    | 'gpt-5.1'
    | 'gpt-5.2'
    | 'gpt-5.4'
    | 'gpt-5.4-mini'
    | 'gpt-5.4-nano'
    | 'gpt-5.5'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite';

  /**
   * Array of metric names to evaluate
   */
  metrics: Array<string>;

  /**
   * Name of the test case definition
   */
  name: string;

  /**
   * Response engine to use for the test case. Custom LLM is not supported.
   */
  response_engine:
    | TestCaseDefinitionResponse.ResponseEngineRetellLm
    | TestCaseDefinitionResponse.ResponseEngineConversationFlow;

  /**
   * Unique identifier for the test case definition
   */
  test_case_definition_id: string;

  /**
   * Mock tool calls for testing
   */
  tool_mocks: Array<TestCaseDefinitionResponse.ToolMock>;

  /**
   * Type of test case definition
   */
  type: 'simulation';

  /**
   * Timestamp when the test case definition was last modified (milliseconds since
   * epoch)
   */
  user_modified_timestamp: number;

  /**
   * User prompt to simulate in the test case
   */
  user_prompt: string;
}

export namespace TestCaseDefinitionResponse {
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

  export interface ToolMock {
    /**
     * Rule for matching tool calls
     */
    input_match_rule: ToolMock.Type | ToolMock.UnionMember1;

    /**
     * The output of the tool call that will be fed into the LLM. Should be a JSON
     * string.
     */
    output: string;

    /**
     * Name of the tool to mock
     */
    tool_name: string;

    /**
     * For tool calls like transfer_call that require a boolean result. Optional for
     * most tools.
     */
    result?: boolean | null;
  }

  export namespace ToolMock {
    export interface Type {
      /**
       * Match any input of the tool
       */
      type: 'any';
    }

    export interface UnionMember1 {
      /**
       * Arguments to match. Only provided fields will be checked
       */
      args: unknown;

      /**
       * Match only calls with specific arguments
       */
      type: 'partial_match';
    }
  }
}

export interface TestCaseJobResponse {
  /**
   * Timestamp when the test case job was created (milliseconds since epoch)
   */
  creation_timestamp: number;

  /**
   * Status of the test case job. `pending` means the run is queued but has not
   * started yet; it becomes `in_progress` once a worker picks it up, then resolves
   * to `pass`, `fail`, or `error`.
   */
  status: 'pending' | 'in_progress' | 'pass' | 'fail' | 'error';

  /**
   * ID of the test case definition used
   */
  test_case_definition_id: string;

  /**
   * Snapshot of the test case definition at time of execution
   */
  test_case_definition_snapshot: TestCaseDefinitionResponse;

  /**
   * Unique identifier for the test case job
   */
  test_case_job_id: string;

  /**
   * Timestamp when the test case job was last modified (milliseconds since epoch)
   */
  user_modified_timestamp: number;

  /**
   * Explanation of the test result
   */
  result_explanation?: string | null;

  /**
   * Snapshot of the transcript generated during test execution. Can be either
   * ConversationFlowPlaygroundSnapshot or RetellLlmPlaygroundSnapshot
   */
  transcript_snapshot?: unknown | null;
}

export interface TestListBatchTestsResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<BatchTestResponse>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export interface TestListTestCaseDefinitionsResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<TestCaseDefinitionResponse>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export interface TestListTestRunsResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<TestCaseJobResponse>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export interface TestCreateTestCaseDefinitionParams {
  /**
   * Array of metric names to evaluate
   */
  metrics: Array<string>;

  /**
   * Name of the test case definition
   */
  name: string;

  /**
   * Response engine to use for the test case. Custom LLM is not supported.
   */
  response_engine:
    | TestCreateTestCaseDefinitionParams.ResponseEngineRetellLm
    | TestCreateTestCaseDefinitionParams.ResponseEngineConversationFlow;

  /**
   * User prompt to simulate in the test case
   */
  user_prompt: string;

  /**
   * Dynamic variables to inject into the response engine
   */
  dynamic_variables?: { [key: string]: string };

  /**
   * LLM model to use for simulation
   */
  llm_model?:
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'gpt-5'
    | 'gpt-5-mini'
    | 'gpt-5-nano'
    | 'gpt-5.1'
    | 'gpt-5.2'
    | 'gpt-5.4'
    | 'gpt-5.4-mini'
    | 'gpt-5.4-nano'
    | 'gpt-5.5'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite';

  /**
   * Mock tool calls for testing
   */
  tool_mocks?: Array<TestCreateTestCaseDefinitionParams.ToolMock>;
}

export namespace TestCreateTestCaseDefinitionParams {
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

  export interface ToolMock {
    /**
     * Rule for matching tool calls
     */
    input_match_rule: ToolMock.Type | ToolMock.UnionMember1;

    /**
     * The output of the tool call that will be fed into the LLM. Should be a JSON
     * string.
     */
    output: string;

    /**
     * Name of the tool to mock
     */
    tool_name: string;

    /**
     * For tool calls like transfer_call that require a boolean result. Optional for
     * most tools.
     */
    result?: boolean | null;
  }

  export namespace ToolMock {
    export interface Type {
      /**
       * Match any input of the tool
       */
      type: 'any';
    }

    export interface UnionMember1 {
      /**
       * Arguments to match. Only provided fields will be checked
       */
      args: unknown;

      /**
       * Match only calls with specific arguments
       */
      type: 'partial_match';
    }
  }
}

export interface TestListTestCaseDefinitionsParams {
  /**
   * Type of response engine
   */
  type: 'retell-llm' | 'conversation-flow';

  /**
   * Conversation flow ID (required when type is conversation-flow)
   */
  conversation_flow_id?: string;

  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * LLM ID (required when type is retell-llm)
   */
  llm_id?: string;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;
}

export interface TestUpdateTestCaseDefinitionParams {
  /**
   * Dynamic variables to inject into the response engine
   */
  dynamic_variables?: { [key: string]: string };

  /**
   * LLM model to use for simulation
   */
  llm_model?:
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'gpt-5'
    | 'gpt-5-mini'
    | 'gpt-5-nano'
    | 'gpt-5.1'
    | 'gpt-5.2'
    | 'gpt-5.4'
    | 'gpt-5.4-mini'
    | 'gpt-5.4-nano'
    | 'gpt-5.5'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite';

  /**
   * Array of metric names to evaluate
   */
  metrics?: Array<string>;

  /**
   * Name of the test case definition
   */
  name?: string;

  /**
   * Response engine to use for the test case. Custom LLM is not supported.
   */
  response_engine?:
    | TestUpdateTestCaseDefinitionParams.ResponseEngineRetellLm
    | TestUpdateTestCaseDefinitionParams.ResponseEngineConversationFlow;

  /**
   * Mock tool calls for testing
   */
  tool_mocks?: Array<TestUpdateTestCaseDefinitionParams.ToolMock>;

  /**
   * User prompt to simulate in the test case
   */
  user_prompt?: string;
}

export namespace TestUpdateTestCaseDefinitionParams {
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

  export interface ToolMock {
    /**
     * Rule for matching tool calls
     */
    input_match_rule: ToolMock.Type | ToolMock.UnionMember1;

    /**
     * The output of the tool call that will be fed into the LLM. Should be a JSON
     * string.
     */
    output: string;

    /**
     * Name of the tool to mock
     */
    tool_name: string;

    /**
     * For tool calls like transfer_call that require a boolean result. Optional for
     * most tools.
     */
    result?: boolean | null;
  }

  export namespace ToolMock {
    export interface Type {
      /**
       * Match any input of the tool
       */
      type: 'any';
    }

    export interface UnionMember1 {
      /**
       * Arguments to match. Only provided fields will be checked
       */
      args: unknown;

      /**
       * Match only calls with specific arguments
       */
      type: 'partial_match';
    }
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

export interface TestListBatchTestsParams {
  /**
   * Type of response engine
   */
  type: 'retell-llm' | 'conversation-flow';

  /**
   * Conversation flow ID (required when type is conversation-flow)
   */
  conversation_flow_id?: string;

  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * LLM ID (required when type is retell-llm)
   */
  llm_id?: string;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;

  /**
   * Version of the response engine (defaults to latest)
   */
  version?: number;
}

export interface TestListTestRunsParams {
  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;
}

export declare namespace Tests {
  export {
    type BatchTestResponse as BatchTestResponse,
    type TestCaseDefinitionResponse as TestCaseDefinitionResponse,
    type TestCaseJobResponse as TestCaseJobResponse,
    type TestListBatchTestsResponse as TestListBatchTestsResponse,
    type TestListTestCaseDefinitionsResponse as TestListTestCaseDefinitionsResponse,
    type TestListTestRunsResponse as TestListTestRunsResponse,
    type TestCreateTestCaseDefinitionParams as TestCreateTestCaseDefinitionParams,
    type TestListTestCaseDefinitionsParams as TestListTestCaseDefinitionsParams,
    type TestUpdateTestCaseDefinitionParams as TestUpdateTestCaseDefinitionParams,
    type TestCreateBatchTestParams as TestCreateBatchTestParams,
    type TestListBatchTestsParams as TestListBatchTestsParams,
    type TestListTestRunsParams as TestListTestRunsParams,
  };
}
