// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Voice extends APIResource {
  /**
   * Retrieve details of a specific voice
   */
  retrieve(voiceID: string, options?: RequestOptions): APIPromise<VoiceResponse> {
    return this._client.get(path`/get-voice/${voiceID}`, options);
  }

  /**
   * List all voices available to the user
   */
  list(options?: RequestOptions): APIPromise<VoiceListResponse> {
    return this._client.get('/list-voices', options);
  }

  /**
   * Add a community voice to the voice library
   */
  addResource(body: VoiceAddResourceParams, options?: RequestOptions): APIPromise<VoiceResponse> {
    return this._client.post('/add-community-voice', { body, ...options });
  }

  /**
   * Clone a voice from audio files
   */
  clone(body: VoiceCloneParams, options?: RequestOptions): APIPromise<VoiceResponse> {
    return this._client.post('/clone-voice', multipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * Search for community voices from voice providers
   */
  search(body: VoiceSearchParams, options?: RequestOptions): APIPromise<VoiceSearchResponse> {
    return this._client.post('/search-community-voice', { body, ...options });
  }
}

export interface VoiceResponse {
  /**
   * Gender of voice.
   */
  gender: 'male' | 'female';

  /**
   * Indicates the provider of voice.
   */
  provider: 'elevenlabs' | 'openai' | 'deepgram' | 'cartesia' | 'minimax';

  /**
   * Unique id for the voice.
   */
  voice_id: string;

  /**
   * Name of the voice.
   */
  voice_name: string;

  /**
   * Accent annotation of the voice.
   */
  accent?: string;

  /**
   * Age annotation of the voice.
   */
  age?: string;

  /**
   * URL to the preview audio of the voice.
   */
  preview_audio_url?: string;
}

export type VoiceListResponse = Array<VoiceResponse>;

export interface VoiceSearchResponse {
  voices: Array<VoiceSearchResponse.Voice>;
}

export namespace VoiceSearchResponse {
  /**
   * Voices retrieved from the provider.
   */
  export interface Voice {
    /**
     * Description of the voice.
     */
    description?: string;

    /**
     * Name of the voice.
     */
    name?: string;

    /**
     * id of the voice from the provider.
     */
    provider_voice_id?: string;

    /**
     * For elevenlabs only. User id of the voice owner.
     */
    public_user_id?: string;
  }
}

export interface VoiceAddResourceParams {
  /**
   * Voice id assigned by the provider.
   */
  provider_voice_id: string;

  /**
   * A custom name for the voice.
   */
  voice_name: string;

  /**
   * Required for ElevenLabs only. User id of the voice owner.
   */
  public_user_id?: string;

  /**
   * Voice provider to add the voice from.
   */
  voice_provider?: 'elevenlabs' | 'cartesia' | 'minimax';
}

export interface VoiceCloneParams {
  /**
   * Audio files to use for voice cloning. Up to 25 files allowed. For Cartesia and
   * MiniMax, only 1 file is supported.
   */
  files: Array<Uploadable>;

  /**
   * Name for the cloned voice
   */
  voice_name: string;

  /**
   * Voice provider to use for cloning. Defaults to elevenlabs.
   */
  voice_provider?: 'elevenlabs' | 'cartesia' | 'minimax';
}

export interface VoiceSearchParams {
  /**
   * Search query to find voices by name, description, or ID.
   */
  search_query: string;

  /**
   * Voice provider to search.
   */
  voice_provider?: 'elevenlabs' | 'cartesia' | 'minimax';
}

export declare namespace Voice {
  export {
    type VoiceResponse as VoiceResponse,
    type VoiceListResponse as VoiceListResponse,
    type VoiceSearchResponse as VoiceSearchResponse,
    type VoiceAddResourceParams as VoiceAddResourceParams,
    type VoiceCloneParams as VoiceCloneParams,
    type VoiceSearchParams as VoiceSearchParams,
  };
}
