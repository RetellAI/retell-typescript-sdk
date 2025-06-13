// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Retell } from './index';

export abstract class APIResource {
  protected _client: Retell;

  constructor(client: Retell) {
    this._client = client;
  }
}
