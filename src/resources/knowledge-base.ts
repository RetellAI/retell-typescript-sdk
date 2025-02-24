// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class KnowledgeBase extends APIResource {
  /**
   * Create a new knowledge base
   */
  create(
    body: KnowledgeBaseCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<KnowledgeBaseResponse> {
    return this._client.post(
      '/create-knowledge-base',
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }

  /**
   * Retrieve details of a specific knowledge base
   */
  retrieve(knowledgeBaseId: string, options?: Core.RequestOptions): Core.APIPromise<KnowledgeBaseResponse> {
    return this._client.get(`/get-knowledge-base/${knowledgeBaseId}`, options);
  }

  /**
   * List all knowledge bases
   */
  list(options?: Core.RequestOptions): Core.APIPromise<KnowledgeBaseListResponse> {
    return this._client.get('/list-knowledge-bases', options);
  }

  /**
   * Delete an existing knowledge base
   */
  delete(knowledgeBaseId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-knowledge-base/${knowledgeBaseId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
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
   * error in processing, it's "error".
   */
  status: 'in_progress' | 'complete' | 'error';

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
  knowledge_base_files?: Array<Core.Uploadable>;

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

export declare namespace KnowledgeBase {
  export {
    type KnowledgeBaseResponse as KnowledgeBaseResponse,
    type KnowledgeBaseListResponse as KnowledgeBaseListResponse,
    type KnowledgeBaseCreateParams as KnowledgeBaseCreateParams,
  };
}
