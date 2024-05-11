// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import * as AgentAPI from 'retell-sdk/resources/agent';

export class Agent extends APIResource {
  /**
   * Create a new agent
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentResponse> {
    return this._client.post('/create-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific agent
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentResponse> {
    return this._client.get(`/get-agent/${agentId}`, options);
  }

  /**
   * Update an existing agent
   */
  update(
    agentId: string,
    body: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentResponse> {
    return this._client.patch(`/update-agent/${agentId}`, { body, ...options });
  }

  /**
   * List all agents
   */
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse> {
    return this._client.get('/list-agents', options);
  }

  /**
   * Delete an existing agent
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-agent/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface AgentResponse {
  /**
   * Unique id of agent.
   */
  agent_id: string;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * If set, will add ambient environment sound to the call to make experience more
   * realistic. Currently supports the following options:
   *
   * - `coffee-shop`: Coffee shop ambience with people chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
   *
   * - `convention-hall`: Convention hall ambience, with some echo and people
   *   chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
   *
   * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
   *
   * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
   *
   * - `static-noise`: Constant static noise.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
   *
   * Set to `null` to remove ambient sound from this agent.
   */
  ambient_sound?:
    | 'coffee-shop'
    | 'convention-hall'
    | 'summer-outdoor'
    | 'mountain-outdoor'
    | 'static-noise'
    | null;

  /**
   * Only applicable when enable_backchannel is true. Controls how often the agent
   * would backchannel when a backchannel is possible. Value ranging from [0,1].
   * Lower value means less frequent backchannel, while higher value means more
   * frequent backchannel. If unset, default value 0.8 will apply.
   */
  backchannel_frequency?: number;

  /**
   * Only applicable when enable_backchannel is true. A list of words that the agent
   * would use as backchannel. If not set, default backchannel words will apply.
   * Check out
   * [backchannel default words](/agent/interaction-configuration#backchannel) for
   * more details. Note that certain voices do not work too well with certain words,
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string>;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Controls how sensitive the agent is to user interruptions. Value ranging from
   * [0,1]. Lower value means it will take longer / more words for user to interrupt
   * agent, while higher value means it's easier for user to interrupt agent. If
   * unset, default value 1 will apply. When this is set to 0, agent would never be
   * interrupted.
   */
  interruption_sensitivity?: number;

  /**
   * Specifies what language (and dialect) the speech recognition will operate in.
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English. If unset, will use default value `en-US`.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR';

  /**
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentResponse.PronunciationDictionary> | null;

  /**
   * If set, controls how many times agent would remind user when user is
   * unresponsive. Must be a non negative integer. If unset, default value of 1 will
   * apply (remind once). Set to 0 to disable agent from reminding.
   */
  reminder_max_count?: number;

  /**
   * If set (in milliseconds), will trigger a reminder to the agent to speak if the
   * user has been silent for the specified duration after some agent speech. Must be
   * a positive number. If unset, default value of 10000 ms (10 s) will apply.
   */
  reminder_trigger_ms?: number;

  /**
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
   * speech, while higher value means faster speech rate. If unset, default value 1
   * will apply.
   */
  voice_speed?: number;

  /**
   * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
   * more stable, and higher value means more variant speech generation. Currently
   * this setting only applies to `11labs` voices. If unset, default value 1 will
   * apply.
   */
  voice_temperature?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentResponse {
  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to be used for pronunciation.
     */
    alphabet: 'ipa' | 'cmu';

    /**
     * Pronunciation of the word in the format of a IPA / CMU pronunciation.
     */
    phoneme: string;

    /**
     * The string of word / phrase to be annotated with pronunciation.
     */
    word: string;
  }
}

export type AgentListResponse = Array<AgentResponse>;

export interface AgentCreateParams {
  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * If set, will add ambient environment sound to the call to make experience more
   * realistic. Currently supports the following options:
   *
   * - `coffee-shop`: Coffee shop ambience with people chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
   *
   * - `convention-hall`: Convention hall ambience, with some echo and people
   *   chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
   *
   * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
   *
   * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
   *
   * - `static-noise`: Constant static noise.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
   *
   * Set to `null` to remove ambient sound from this agent.
   */
  ambient_sound?:
    | 'coffee-shop'
    | 'convention-hall'
    | 'summer-outdoor'
    | 'mountain-outdoor'
    | 'static-noise'
    | null;

  /**
   * Only applicable when enable_backchannel is true. Controls how often the agent
   * would backchannel when a backchannel is possible. Value ranging from [0,1].
   * Lower value means less frequent backchannel, while higher value means more
   * frequent backchannel. If unset, default value 0.8 will apply.
   */
  backchannel_frequency?: number;

  /**
   * Only applicable when enable_backchannel is true. A list of words that the agent
   * would use as backchannel. If not set, default backchannel words will apply.
   * Check out
   * [backchannel default words](/agent/interaction-configuration#backchannel) for
   * more details. Note that certain voices do not work too well with certain words,
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string>;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Controls how sensitive the agent is to user interruptions. Value ranging from
   * [0,1]. Lower value means it will take longer / more words for user to interrupt
   * agent, while higher value means it's easier for user to interrupt agent. If
   * unset, default value 1 will apply. When this is set to 0, agent would never be
   * interrupted.
   */
  interruption_sensitivity?: number;

  /**
   * Specifies what language (and dialect) the speech recognition will operate in.
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English. If unset, will use default value `en-US`.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR';

  /**
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentCreateParams.PronunciationDictionary> | null;

  /**
   * If set, controls how many times agent would remind user when user is
   * unresponsive. Must be a non negative integer. If unset, default value of 1 will
   * apply (remind once). Set to 0 to disable agent from reminding.
   */
  reminder_max_count?: number;

  /**
   * If set (in milliseconds), will trigger a reminder to the agent to speak if the
   * user has been silent for the specified duration after some agent speech. Must be
   * a positive number. If unset, default value of 10000 ms (10 s) will apply.
   */
  reminder_trigger_ms?: number;

  /**
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
   * speech, while higher value means faster speech rate. If unset, default value 1
   * will apply.
   */
  voice_speed?: number;

  /**
   * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
   * more stable, and higher value means more variant speech generation. Currently
   * this setting only applies to `11labs` voices. If unset, default value 1 will
   * apply.
   */
  voice_temperature?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentCreateParams {
  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to be used for pronunciation.
     */
    alphabet: 'ipa' | 'cmu';

    /**
     * Pronunciation of the word in the format of a IPA / CMU pronunciation.
     */
    phoneme: string;

    /**
     * The string of word / phrase to be annotated with pronunciation.
     */
    word: string;
  }
}

export interface AgentUpdateParams {
  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * If set, will add ambient environment sound to the call to make experience more
   * realistic. Currently supports the following options:
   *
   * - `coffee-shop`: Coffee shop ambience with people chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
   *
   * - `convention-hall`: Convention hall ambience, with some echo and people
   *   chatting in background.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
   *
   * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
   *
   * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
   *
   * - `static-noise`: Constant static noise.
   *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
   *
   * Set to `null` to remove ambient sound from this agent.
   */
  ambient_sound?:
    | 'coffee-shop'
    | 'convention-hall'
    | 'summer-outdoor'
    | 'mountain-outdoor'
    | 'static-noise'
    | null;

  /**
   * Only applicable when enable_backchannel is true. Controls how often the agent
   * would backchannel when a backchannel is possible. Value ranging from [0,1].
   * Lower value means less frequent backchannel, while higher value means more
   * frequent backchannel. If unset, default value 0.8 will apply.
   */
  backchannel_frequency?: number;

  /**
   * Only applicable when enable_backchannel is true. A list of words that the agent
   * would use as backchannel. If not set, default backchannel words will apply.
   * Check out
   * [backchannel default words](/agent/interaction-configuration#backchannel) for
   * more details. Note that certain voices do not work too well with certain words,
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string>;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Controls how sensitive the agent is to user interruptions. Value ranging from
   * [0,1]. Lower value means it will take longer / more words for user to interrupt
   * agent, while higher value means it's easier for user to interrupt agent. If
   * unset, default value 1 will apply. When this is set to 0, agent would never be
   * interrupted.
   */
  interruption_sensitivity?: number;

  /**
   * Specifies what language (and dialect) the speech recognition will operate in.
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English. If unset, will use default value `en-US`.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR';

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentUpdateParams.PronunciationDictionary> | null;

  /**
   * If set, controls how many times agent would remind user when user is
   * unresponsive. Must be a non negative integer. If unset, default value of 1 will
   * apply (remind once). Set to 0 to disable agent from reminding.
   */
  reminder_max_count?: number;

  /**
   * If set (in milliseconds), will trigger a reminder to the agent to speak if the
   * user has been silent for the specified duration after some agent speech. Must be
   * a positive number. If unset, default value of 10000 ms (10 s) will apply.
   */
  reminder_trigger_ms?: number;

  /**
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id?: string;

  /**
   * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
   * speech, while higher value means faster speech rate. If unset, default value 1
   * will apply.
   */
  voice_speed?: number;

  /**
   * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
   * more stable, and higher value means more variant speech generation. Currently
   * this setting only applies to `11labs` voices. If unset, default value 1 will
   * apply.
   */
  voice_temperature?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentUpdateParams {
  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to be used for pronunciation.
     */
    alphabet: 'ipa' | 'cmu';

    /**
     * Pronunciation of the word in the format of a IPA / CMU pronunciation.
     */
    phoneme: string;

    /**
     * The string of word / phrase to be annotated with pronunciation.
     */
    word: string;
  }
}

export namespace Agent {
  export import AgentResponse = AgentAPI.AgentResponse;
  export import AgentListResponse = AgentAPI.AgentListResponse;
  export import AgentCreateParams = AgentAPI.AgentCreateParams;
  export import AgentUpdateParams = AgentAPI.AgentUpdateParams;
}
