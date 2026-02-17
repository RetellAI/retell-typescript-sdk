// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class KnowledgeBase extends APIResource {
  /**
   * Create a new knowledge base
   *
   * @example
   * ```ts
   * const knowledgeBaseResponse =
   *   await client.knowledgeBase.create({
   *     knowledge_base_name: 'Sample KB',
   *   });
   * ```
   */
  create(body: KnowledgeBaseCreateParams, options?: RequestOptions): APIPromise<KnowledgeBaseResponse> {
    return this._client.post(
      '/create-knowledge-base',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Retrieve details of a specific knowledge base
   *
   * @example
   * ```ts
   * const knowledgeBaseResponse =
   *   await client.knowledgeBase.retrieve('kb_1234567890');
   * ```
   */
  retrieve(knowledgeBaseID: string, options?: RequestOptions): APIPromise<KnowledgeBaseResponse> {
    return this._client.get(path`/get-knowledge-base/${knowledgeBaseID}`, options);
  }

  /**
   * List all knowledge bases
   *
   * @example
   * ```ts
   * const knowledgeBaseResponses =
   *   await client.knowledgeBase.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<KnowledgeBaseListResponse> {
    return this._client.get('/list-knowledge-bases', options);
  }

  /**
   * Delete an existing knowledge base
   *
   * @example
   * ```ts
   * await client.knowledgeBase.delete('kb_1234567890');
   * ```
   */
  delete(knowledgeBaseID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-knowledge-base/${knowledgeBaseID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Add sources to a knowledge base
   *
   * @example
   * ```ts
   * const knowledgeBaseResponse =
   *   await client.knowledgeBase.addSources('kb_1234567890');
   * ```
   */
  addSources(
    knowledgeBaseID: string,
    body: KnowledgeBaseAddSourcesParams,
    options?: RequestOptions,
  ): APIPromise<KnowledgeBaseResponse> {
    return this._client.post(
      path`/add-knowledge-base-sources/${knowledgeBaseID}`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Delete an existing source from knowledge base
   *
   * @example
   * ```ts
   * const knowledgeBaseResponse =
   *   await client.knowledgeBase.deleteSource(
   *     'source_1234567890',
   *     { knowledge_base_id: 'kb_1234567890' },
   *   );
   * ```
   */
  deleteSource(
    sourceID: string,
    params: KnowledgeBaseDeleteSourceParams,
    options?: RequestOptions,
  ): APIPromise<KnowledgeBaseResponse> {
    const { knowledge_base_id } = params;
    return this._client.delete(
      path`/delete-knowledge-base-source/${knowledge_base_id}/source/${sourceID}`,
      options,
    );
  }
}

export interface KnowledgeBaseResponse {
  /**
   * Unique id of the knowledge base.
   */
  knowledge_base_id: string;

  /**
   * Name of the knowledge base. Must be less than 40 characters.
   */
  knowledge_base_name: string;

  /**
   * Status of the knowledge base. When it's created and being processed, it's
   * "in_progress". When the processing is done, it's "complete". When there's an
   * error in processing, it's "error". When it is during kb updating, it's
   * "refreshing_in_progress".
   */
  status: 'in_progress' | 'complete' | 'error' | 'refreshing_in_progress';

  /**
   * Whether to enable auto refresh for the knowledge base urls. If set to true, will
   * retrieve the data from the specified url every 12 hours.
   */
  enable_auto_refresh?: boolean;

  /**
   * Sources of the knowledge base. Will be populated after the processing is done
   * (when status is "complete").
   */
  knowledge_base_sources?: Array<
    | KnowledgeBaseResponse.KnowledgeBaseSourceDocument
    | KnowledgeBaseResponse.KnowledgeBaseSourceText
    | KnowledgeBaseResponse.KnowledgeBaseSourceURL
  >;

  /**
   * Last refreshed timestamp (milliseconds since epoch). Only applicable when
   * enable_auto_refresh is true.
   */
  last_refreshed_timestamp?: number;
}

export namespace KnowledgeBaseResponse {
  export interface KnowledgeBaseSourceDocument {
    /**
     * URL of the document stored.
     */
    file_url: string;

    /**
     * Filename of the document.
     */
    filename: string;

    /**
     * Unique id of the knowledge base source.
     */
    source_id: string;

    /**
     * Type of the knowledge base source.
     */
    type: 'document';
  }

  export interface KnowledgeBaseSourceText {
    /**
     * URL of the text content stored.
     */
    content_url: string;

    /**
     * Unique id of the knowledge base source.
     */
    source_id: string;

    /**
     * Title of the text.
     */
    title: string;

    /**
     * Type of the knowledge base source.
     */
    type: 'text';
  }

  export interface KnowledgeBaseSourceURL {
    /**
     * Unique id of the knowledge base source.
     */
    source_id: string;

    /**
     * Type of the knowledge base source.
     */
    type: 'url';

    /**
     * URL used to be scraped and added to the knowledge base.
     */
    url: string;
  }
}

export type KnowledgeBaseListResponse = Array<KnowledgeBaseResponse>;

export interface KnowledgeBaseCreateParams {
  /**
   * Name of the knowledge base. Must be less than 40 characters.
   */
  knowledge_base_name: string;

  /**
   * Whether to enable auto refresh for the knowledge base urls. If set to true, will
   * retrieve the data from the specified url every 12 hours.
   */
  enable_auto_refresh?: boolean;

  /**
   * Files to add to the knowledge base. Limit to 25 files, where each file is
   * limited to 50MB.
   */
  knowledge_base_files?: Array<Uploadable>;

  /**
   * Texts to add to the knowledge base.
   */
  knowledge_base_texts?: Array<KnowledgeBaseCreateParams.KnowledgeBaseText>;

  /**
   * URLs to be scraped and added to the knowledge base. Must be valid urls.
   */
  knowledge_base_urls?: Array<string>;
}

export namespace KnowledgeBaseCreateParams {
  export interface KnowledgeBaseText {
    /**
     * Text to add to the knowledge base.
     */
    text: string;

    /**
     * Title of the text.
     */
    title: string;
  }
}

export interface KnowledgeBaseAddSourcesParams {
  /**
   * Files to add to the knowledge base. Limit to 25 files, where each file is
   * limited to 50MB.
   */
  knowledge_base_files?: Array<Uploadable>;

  /**
   * Texts to add to the knowledge base.
   */
  knowledge_base_texts?: Array<KnowledgeBaseAddSourcesParams.KnowledgeBaseText>;

  /**
   * URLs to be scraped and added to the knowledge base. Must be valid urls.
   */
  knowledge_base_urls?: Array<string>;
}

export namespace KnowledgeBaseAddSourcesParams {
  export interface KnowledgeBaseText {
    /**
     * Text to add to the knowledge base.
     */
    text: string;

    /**
     * Title of the text.
     */
    title: string;
  }
}

export interface KnowledgeBaseDeleteSourceParams {
  /**
   * The knowledge base id to delete source from.
   */
  knowledge_base_id: string;
}

export declare namespace KnowledgeBase {
  export {
    type KnowledgeBaseResponse as KnowledgeBaseResponse,
    type KnowledgeBaseListResponse as KnowledgeBaseListResponse,
    type KnowledgeBaseCreateParams as KnowledgeBaseCreateParams,
    type KnowledgeBaseAddSourcesParams as KnowledgeBaseAddSourcesParams,
    type KnowledgeBaseDeleteSourceParams as KnowledgeBaseDeleteSourceParams,
  };
}
