// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdka/core';
import { APIResource } from 'retell-sdka/resource';
import * as AgentsAPI from 'retell-sdka/resources/agents';

export class Agents extends APIResource {
  /**
   * Create a new agent
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentCreateResponse> {
    return this._client.post('/create-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific agent
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentRetrieveResponse> {
    return this._client.get(`/get-agent/${agentId}`, options);
  }

  /**
   * Update an existing agent
   */
  update(
    agentId: string,
    body: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentUpdateResponse> {
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

export interface AgentCreateResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

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
   * Set to string `null` to remove ambient sound from this agent.
   */
  ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string>;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Whether to format the transcribed text with inverse text normalization. It
   * transforms the spoken form of text into written form for entities like phone
   * number, email address, street address, etc. For example, "february fourth twenty
   * twenty two" can be converted into "february 4th 2022". If not set, the default
   * is true.
   */
  format_text?: boolean;

  /**
   * `Beta feature, use with caution.`
   *
   * This setting specifies the agent's operational language, including base language
   * and dialect. Speech recognition considers both elements, but text-to-speech
   * currently only recognizes the base language.
   *
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English, yet text-to-speech output will be in standard English. If
   * dialect-specific text-to-speech is required, please contact us for support.
   *
   * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt)
   *
   * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt), Japanese(ja)
   *
   * - `deepgram voices`: supports English(en)
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
    | 'pt-BR';

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Disable transcripts and recordings storage for enhanced privacy. Access
   * transcripts securely via webhooks.
   */
  optOutSensitiveDataStorage?: boolean;

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
   * agent. Set to string `null` to remove webhook url from this agent.
   */
  webhook_url?: string;
}

export interface AgentRetrieveResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

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
   * Set to string `null` to remove ambient sound from this agent.
   */
  ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string>;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Whether to format the transcribed text with inverse text normalization. It
   * transforms the spoken form of text into written form for entities like phone
   * number, email address, street address, etc. For example, "february fourth twenty
   * twenty two" can be converted into "february 4th 2022". If not set, the default
   * is true.
   */
  format_text?: boolean;

  /**
   * `Beta feature, use with caution.`
   *
   * This setting specifies the agent's operational language, including base language
   * and dialect. Speech recognition considers both elements, but text-to-speech
   * currently only recognizes the base language.
   *
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English, yet text-to-speech output will be in standard English. If
   * dialect-specific text-to-speech is required, please contact us for support.
   *
   * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt)
   *
   * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt), Japanese(ja)
   *
   * - `deepgram voices`: supports English(en)
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
    | 'pt-BR';

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Disable transcripts and recordings storage for enhanced privacy. Access
   * transcripts securely via webhooks.
   */
  optOutSensitiveDataStorage?: boolean;

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
   * agent. Set to string `null` to remove webhook url from this agent.
   */
  webhook_url?: string;
}

export interface AgentUpdateResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

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
   * Set to string `null` to remove ambient sound from this agent.
   */
  ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string>;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Whether to format the transcribed text with inverse text normalization. It
   * transforms the spoken form of text into written form for entities like phone
   * number, email address, street address, etc. For example, "february fourth twenty
   * twenty two" can be converted into "february 4th 2022". If not set, the default
   * is true.
   */
  format_text?: boolean;

  /**
   * `Beta feature, use with caution.`
   *
   * This setting specifies the agent's operational language, including base language
   * and dialect. Speech recognition considers both elements, but text-to-speech
   * currently only recognizes the base language.
   *
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English, yet text-to-speech output will be in standard English. If
   * dialect-specific text-to-speech is required, please contact us for support.
   *
   * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt)
   *
   * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt), Japanese(ja)
   *
   * - `deepgram voices`: supports English(en)
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
    | 'pt-BR';

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Disable transcripts and recordings storage for enhanced privacy. Access
   * transcripts securely via webhooks.
   */
  optOutSensitiveDataStorage?: boolean;

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
   * agent. Set to string `null` to remove webhook url from this agent.
   */
  webhook_url?: string;
}

export type AgentListResponse = Array<AgentListResponse.AgentListResponseItem>;

export namespace AgentListResponse {
  export interface AgentListResponseItem {
    /**
     * Unique id of agent.
     */
    agent_id?: string;

    /**
     * The name of the agent. Only used for your own reference.
     */
    agent_name?: string;

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
     * Set to string `null` to remove ambient sound from this agent.
     */
    ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

    /**
     * Provide a customized list of keywords to bias the transcriber model, so that
     * these words are more likely to get transcribed. Commonly used for names, brands,
     * street, etc.
     */
    boosted_keywords?: Array<string>;

    /**
     * Controls whether the agent would backchannel (agent interjects the speaker with
     * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
     * when enabled tends to show up more in longer user utterances. If not set, agent
     * will not backchannel.
     */
    enable_backchannel?: boolean;

    /**
     * Whether to format the transcribed text with inverse text normalization. It
     * transforms the spoken form of text into written form for entities like phone
     * number, email address, street address, etc. For example, "february fourth twenty
     * twenty two" can be converted into "february 4th 2022". If not set, the default
     * is true.
     */
    format_text?: boolean;

    /**
     * `Beta feature, use with caution.`
     *
     * This setting specifies the agent's operational language, including base language
     * and dialect. Speech recognition considers both elements, but text-to-speech
     * currently only recognizes the base language.
     *
     * For instance, selecting `en-GB` optimizes speech recognition for British
     * English, yet text-to-speech output will be in standard English. If
     * dialect-specific text-to-speech is required, please contact us for support.
     *
     * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
     *   Portuguese(pt)
     *
     * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
     *   Portuguese(pt), Japanese(ja)
     *
     * - `deepgram voices`: supports English(en)
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
      | 'pt-BR';

    /**
     * Last modification timestamp (milliseconds since epoch). Either the time of last
     * update or creation if no updates available.
     */
    last_modification_timestamp?: number;

    /**
     * The URL we will establish LLM websocket for getting response, usually your
     * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
     * request format (sent from us) and response format (send to us).
     */
    llm_websocket_url?: string;

    /**
     * Disable transcripts and recordings storage for enhanced privacy. Access
     * transcripts securely via webhooks.
     */
    optOutSensitiveDataStorage?: boolean;

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
     * agent. Set to string `null` to remove webhook url from this agent.
     */
    webhook_url?: string;
  }
}

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
  agent_name?: string;

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
   * Set to string `null` to remove ambient sound from this agent.
   */
  ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string>;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Whether to format the transcribed text with inverse text normalization. It
   * transforms the spoken form of text into written form for entities like phone
   * number, email address, street address, etc. For example, "february fourth twenty
   * twenty two" can be converted into "february 4th 2022". If not set, the default
   * is true.
   */
  format_text?: boolean;

  /**
   * `Beta feature, use with caution.`
   *
   * This setting specifies the agent's operational language, including base language
   * and dialect. Speech recognition considers both elements, but text-to-speech
   * currently only recognizes the base language.
   *
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English, yet text-to-speech output will be in standard English. If
   * dialect-specific text-to-speech is required, please contact us for support.
   *
   * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt)
   *
   * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt), Japanese(ja)
   *
   * - `deepgram voices`: supports English(en)
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
    | 'pt-BR';

  /**
   * Disable transcripts and recordings storage for enhanced privacy. Access
   * transcripts securely via webhooks.
   */
  optOutSensitiveDataStorage?: boolean;

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
   * agent. Set to string `null` to remove webhook url from this agent.
   */
  webhook_url?: string;
}

export interface AgentUpdateParams {
  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

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
   * Set to string `null` to remove ambient sound from this agent.
   */
  ambient_sound?: 'coffee-shop' | 'convention-hall' | 'summer-outdoor' | 'mountain-outdoor' | 'null';

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string>;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Whether to format the transcribed text with inverse text normalization. It
   * transforms the spoken form of text into written form for entities like phone
   * number, email address, street address, etc. For example, "february fourth twenty
   * twenty two" can be converted into "february 4th 2022". If not set, the default
   * is true.
   */
  format_text?: boolean;

  /**
   * `Beta feature, use with caution.`
   *
   * This setting specifies the agent's operational language, including base language
   * and dialect. Speech recognition considers both elements, but text-to-speech
   * currently only recognizes the base language.
   *
   * For instance, selecting `en-GB` optimizes speech recognition for British
   * English, yet text-to-speech output will be in standard English. If
   * dialect-specific text-to-speech is required, please contact us for support.
   *
   * - `11lab voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt)
   *
   * - `openAI voices`: supports English(en), German(de), Spanish(es), Hindi(hi),
   *   Portuguese(pt), Japanese(ja)
   *
   * - `deepgram voices`: supports English(en)
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
    | 'pt-BR';

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Disable transcripts and recordings storage for enhanced privacy. Access
   * transcripts securely via webhooks.
   */
  optOutSensitiveDataStorage?: boolean;

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
   * agent. Set to string `null` to remove webhook url from this agent.
   */
  webhook_url?: string;
}

export namespace Agents {
  export import AgentCreateResponse = AgentsAPI.AgentCreateResponse;
  export import AgentRetrieveResponse = AgentsAPI.AgentRetrieveResponse;
  export import AgentUpdateResponse = AgentsAPI.AgentUpdateResponse;
  export import AgentListResponse = AgentsAPI.AgentListResponse;
  export import AgentCreateParams = AgentsAPI.AgentCreateParams;
  export import AgentUpdateParams = AgentsAPI.AgentUpdateParams;
}
