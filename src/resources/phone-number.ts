// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import * as PhoneNumberAPI from 'retell-sdk/resources/phone-number';

export class PhoneNumber extends APIResource {
  /**
   * Buy a new phone number
   */
  create(
    body: PhoneNumberCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneNumberCreateResponse> {
    return this._client.post('/create-phone-number', { body, ...options });
  }

  /**
   * Retrieve details of a specific phone number
   */
  retrieve(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberRetrieveResponse> {
    return this._client.get(`/get-phone-number/${phoneNumber}`, options);
  }

  /**
   * Update an existing Retell LLM
   */
  update(
    phoneNumber: string,
    body: PhoneNumberUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneNumberUpdateResponse> {
    return this._client.patch(`/update-phone-number/${phoneNumber}`, { body, ...options });
  }

  /**
   * List all phone numbers
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PhoneNumberListResponse> {
    return this._client.get('/list-phone-number', options);
  }

  /**
   * Delete an existing phone number
   */
  delete(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-phone-number/${phoneNumber}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface PhoneNumberCreateResponse {
  agent_id: string;

  area_code: number;

  last_modification_timestamp: number;

  phone_number: string;

  phone_number_pretty: string;
}

export interface PhoneNumberRetrieveResponse {
  agent_id: string;

  area_code: number;

  last_modification_timestamp: number;

  phone_number: string;

  phone_number_pretty: string;
}

export interface PhoneNumberUpdateResponse {
  agent_id: string;

  area_code: number;

  last_modification_timestamp: number;

  phone_number: string;

  phone_number_pretty: string;
}

export type PhoneNumberListResponse = Array<PhoneNumberListResponse.PhoneNumberListResponseItem>;

export namespace PhoneNumberListResponse {
  export interface PhoneNumberListResponseItem {
    agent_id: string;

    area_code: number;

    last_modification_timestamp: number;

    phone_number: string;

    phone_number_pretty: string;
  }
}

export interface PhoneNumberCreateParams {
  /**
   * Unique id of agent used for the call. Your agent would contain the LLM Websocket
   * url used for this call.
   */
  agent_id: string;

  /**
   * Area code of the number
   */
  area_code?: string;
}

export interface PhoneNumberUpdateParams {
  /**
   * update agent used when a call connects.
   */
  agent_id: string;
}

export namespace PhoneNumber {
  export import PhoneNumberCreateResponse = PhoneNumberAPI.PhoneNumberCreateResponse;
  export import PhoneNumberRetrieveResponse = PhoneNumberAPI.PhoneNumberRetrieveResponse;
  export import PhoneNumberUpdateResponse = PhoneNumberAPI.PhoneNumberUpdateResponse;
  export import PhoneNumberListResponse = PhoneNumberAPI.PhoneNumberListResponse;
  export import PhoneNumberCreateParams = PhoneNumberAPI.PhoneNumberCreateParams;
  export import PhoneNumberUpdateParams = PhoneNumberAPI.PhoneNumberUpdateParams;
}
