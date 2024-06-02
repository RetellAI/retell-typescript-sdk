// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as VoiceAPI from './voice';
import * as PhoneNumberAPI from './phone-number';

export class Voice extends APIResource {
  /**
   * Retrieve details of a specific phone number
   */
  retrieve(
    phoneNumber: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneNumberAPI.PhoneNumberResponse> {
    return this._client.get(`/get-phone-number/${phoneNumber}`, options);
  }

  /**
   * List all phone numbers
   */
  list(options?: Core.RequestOptions): Core.APIPromise<VoiceListResponse> {
    return this._client.get('/list-phone-numbers', options);
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

export type VoiceListResponse = Array<PhoneNumberAPI.PhoneNumberResponse>;

export namespace Voice {
  export import VoiceResponse = VoiceAPI.VoiceResponse;
  export import VoiceListResponse = VoiceAPI.VoiceListResponse;
}
