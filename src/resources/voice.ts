// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Voice extends APIResource {
  /**
   * Retrieve details of a specific voice
   */
  retrieve(voiceId: string, options?: Core.RequestOptions): Core.APIPromise<VoiceResponse> {
    return this._client.get(`/get-voice/${voiceId}`, options);
  }

  /**
   * List all voices available to the user
   */
  list(options?: Core.RequestOptions): Core.APIPromise<VoiceListResponse> {
    return this._client.get('/list-voices', options);
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
  provider: 'elevenlabs' | 'openai' | 'deepgram';

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

export declare namespace Voice {
  export { type VoiceResponse as VoiceResponse, type VoiceListResponse as VoiceListResponse };
}
