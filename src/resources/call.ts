// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as CallAPI from './call';

export class Call extends APIResource {
  /**
   * Retrieve details of a specific call
   */
  retrieve(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallDetail> {
    return this._client.get(`/v2/get-call/${callId}`, options);
  }

  /**
   * Retrieve call details
   */
  list(query?: CallListParams, options?: Core.RequestOptions): Core.APIPromise<CallListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<CallListResponse>;
  list(
    query: CallListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v2/list-calls', { query, ...options });
  }

  /**
   * Create a new outbound phone call
   */
  createPhoneCall(
    body: CallCreatePhoneCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneCallDetail> {
    return this._client.post('/v2/create-phone-call', { body, ...options });
  }

  /**
   * Create a new web call
   */
  createWebCall(
    body: CallCreateWebCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallCreateWebCallResponse> {
    return this._client.post('/v2/create-web-call', { body, ...options });
  }
}

export type CallDetail = CallDetail.V2WebCallResponse | PhoneCallDetail;

export namespace CallDetail {
  export interface V2WebCallResponse {
    /**
     * Access token to enter the web call room. This needs to be passed to your
     * frontend to join the call.
     */
    access_token: string;

    /**
     * Corresponding agent id of this call.
     */
    agent_id: string;

    /**
     * Unique id of the call. Used to identify in LLM websocket and used to
     * authenticate in audio websocket.
     */
    call_id: string;

    /**
     * Status of call.
     *
     * - `registered`: Call id issued, starting to make a call using this id.
     *
     * - `ongoing`: Call connected and ongoing.
     *
     * - `ended`: The underlying websocket has ended for the call. Either user or agent
     *   hanged up, or call transferred.
     *
     * - `error`: Call encountered error.
     */
    call_status: 'registered' | 'ongoing' | 'ended' | 'error';

    /**
     * Type of the call. Used to distinguish between web call and phone call.
     */
    call_type: 'web_call';

    /**
     * If users stay silent for a period after agent speech, end the call. The minimum
     * value allowed is 10,000 ms (10 s). This value, if set, would overwrite the agent
     * level end_call_after_silence_ms parameter.
     */
    end_call_after_silence_ms?: number;

    /**
     * An arbitrary object for storage purpose only. You can put anything here like
     * your internal customer id associated with the call. Not used for processing. You
     * can later get this field from the call object.
     */
    metadata?: unknown;

    /**
     * Whether this call opts out of sensitive data storage like transcript, recording,
     * logging.
     */
    opt_out_sensitive_data_storage?: boolean;

    /**
     * Add optional dynamic variables in key value pairs of string that injects into
     * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
     */
    retell_llm_dynamic_variables?: Record<string, unknown>;
  }
}

export interface PhoneCallDetail {
  /**
   * Corresponding agent id of this call.
   */
  agent_id: string;

  /**
   * Unique id of the call. Used to identify in LLM websocket and used to
   * authenticate in audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   *
   * - `ongoing`: Call connected and ongoing.
   *
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hanged up, or call transferred.
   *
   * - `error`: Call encountered error.
   */
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';

  /**
   * Type of the call. Used to distinguish between web call and phone call.
   */
  call_type: 'phone_call';

  /**
   * Direction of the phone call.
   */
  direction: 'inbound' | 'outbound';

  /**
   * The caller number.
   */
  from_number: string;

  /**
   * The callee number.
   */
  to_number: string;

  /**
   * If users stay silent for a period after agent speech, end the call. The minimum
   * value allowed is 10,000 ms (10 s). This value, if set, would overwrite the agent
   * level end_call_after_silence_ms parameter.
   */
  end_call_after_silence_ms?: number;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Whether this call opts out of sensitive data storage like transcript, recording,
   * logging.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export type CallListResponse = Array<CallDetail>;

export interface CallCreateWebCallResponse {
  /**
   * Access token to enter the web call room. This needs to be passed to your
   * frontend to join the call.
   */
  access_token: string;

  /**
   * Corresponding agent id of this call.
   */
  agent_id: string;

  /**
   * Unique id of the call. Used to identify in LLM websocket and used to
   * authenticate in audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   *
   * - `ongoing`: Call connected and ongoing.
   *
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hanged up, or call transferred.
   *
   * - `error`: Call encountered error.
   */
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';

  /**
   * Type of the call. Used to distinguish between web call and phone call.
   */
  call_type: 'web_call';

  /**
   * If users stay silent for a period after agent speech, end the call. The minimum
   * value allowed is 10,000 ms (10 s). This value, if set, would overwrite the agent
   * level end_call_after_silence_ms parameter.
   */
  end_call_after_silence_ms?: number;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Whether this call opts out of sensitive data storage like transcript, recording,
   * logging.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export interface CallListParams {
  filter_criteria?: CallListParams.FilterCriteria;

  /**
   * Limit the number of calls returned.
   */
  limit?: number;

  /**
   * The pagination key to continue fetching the next page of calls. Pagination key
   * is represented by a call id here, and it's exclusive (not included in the
   * fetched calls). The last call id from the list calls is usually used as
   * pagination key here. If not set, will start from the beginning.
   */
  pagination_key?: string;

  /**
   * The calls will be sorted by `start_timestamp`, whether to return the calls in
   * ascending or descending order.
   */
  sort_order?: 'ascending' | 'descending';
}

export namespace CallListParams {
  export interface FilterCriteria {
    /**
     * Inclusive. Filter calls that end on or after this timestamp.
     */
    after_end_timestamp?: number;

    /**
     * Inclusive. Filter calls that start on or after this timestamp.
     */
    after_start_timestamp?: number;

    /**
     * Only retrieve calls that are made with specific agent(s).
     */
    agent_id?: Array<string>;

    /**
     * Exclusive. Filter calls that end before this timestamp.
     */
    before_end_timestamp?: number;

    /**
     * Exclusive. Filter calls that start before this timestamp.
     */
    before_start_timestamp?: number;
  }
}

export interface CallCreatePhoneCallParams {
  /**
   * The number you own in E.164 format. Must be a Retell managed number.
   */
  from_number: string;

  /**
   * The number you want to call, in E.164 format. Right now only US numbers are
   * officially supported.
   */
  to_number: string;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * For this particular call, override the agent used with this agent id. This does
   * not bind the agent to this number, this is for one time override.
   */
  override_agent_id?: string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export interface CallCreateWebCallParams {
  /**
   * Unique id of agent used for the call. Your agent would contain the LLM Websocket
   * url used for this call.
   */
  agent_id: string;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export namespace Call {
  export import CallDetail = CallAPI.CallDetail;
  export import PhoneCallDetail = CallAPI.PhoneCallDetail;
  export import CallListResponse = CallAPI.CallListResponse;
  export import CallCreateWebCallResponse = CallAPI.CallCreateWebCallResponse;
  export import CallListParams = CallAPI.CallListParams;
  export import CallCreatePhoneCallParams = CallAPI.CallCreatePhoneCallParams;
  export import CallCreateWebCallParams = CallAPI.CallCreateWebCallParams;
}
