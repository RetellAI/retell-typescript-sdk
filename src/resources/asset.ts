// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';

export class Asset extends APIResource {
  /**
   * Upload an image or audio asset. Audio is normalized to headerless mono PCM16 at
   * 24 kHz and can be referenced by `custom_on_hold_music_asset_id` on warm and
   * agentic-warm transfer options. Accepted audio formats are MP3, WAV, WebM, OGG,
   * M4A, AAC, and FLAC. The maximum upload size is 10 MB and audio duration is
   * limited to 210 seconds.
   */
  create(body: AssetCreateParams, options?: RequestOptions): APIPromise<AssetCreateResponse> {
    return this._client.post(
      '/create-asset',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface AssetCreateResponse {
  /**
   * Unique identifier for the asset.
   */
  asset_id?: string;

  /**
   * MIME type of the asset.
   */
  content_type?: string;

  /**
   * Unix timestamp of when the asset was created.
   */
  created_timestamp?: number;

  /**
   * Stored file name. Uploaded audio is normalized to headerless PCM and uses a
   * `.pcm` extension.
   */
  file_name?: string;

  /**
   * File size in bytes.
   */
  file_size?: number;

  /**
   * CDN URL to access the asset.
   */
  url?: string;
}

export interface AssetCreateParams {
  /**
   * Image or audio file to upload. Images support PNG, JPEG, GIF, WebP, and SVG.
   * Audio supports MP3, WAV, WebM, OGG, M4A, AAC, and FLAC. Maximum size is 10 MB;
   * audio is limited to 210 seconds.
   */
  file: Uploadable;
}

export declare namespace Asset {
  export { type AssetCreateResponse as AssetCreateResponse, type AssetCreateParams as AssetCreateParams };
}
