// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import * as PhoneNumberAPI from 'retell-sdk/resources/phone-number';

export class PhoneNumber extends APIResource {
  /**
   * Buy a new phone number & Bind an agent
   */
  create(body: PhoneNumberCreateParams, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberResponse> {
    return this._client.post('/create-phone-number', { body, ...options });
  }

  /**
   * Retrieve details of a specific phone number
   */
  retrieve(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberResponse> {
    return this._client.get(`/get-phone-number/${phoneNumber}`, options);
  }

  /**
   * Update agent bound to a purchased phone number
   */
  update(
    phoneNumber: string,
    body: PhoneNumberUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneNumberResponse> {
    return this._client.patch(`/update-phone-number/${phoneNumber}`, { body, ...options });
  }

  /**
   * List all phone numbers
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PhoneNumberListResponse> {
    return this._client.get('/list-phone-numbers', options);
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

export interface PhoneNumberResponse {
  /**
   * Unique id of agent to bind to newly obtained number. The number will
   * automatically use the agent when doing inbound / outbound calls.
   */
  agent_id: string;

  /**
   * Area code of the number to obtain. Format is a 3 digit integer. Currently only
   * supports US area code.
   */
  area_code: number;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp: number;

  /**
   * E.164 format of the number (+country code, then number with no space, no special
   * characters), used as the unique identifier for phone number APIs.
   */
  phone_number: string;

  /**
   * Pretty printed phone number, provided for your reference.
   */
  phone_number_pretty: string;
}

export type PhoneNumberListResponse = Array<PhoneNumberResponse>;

export interface PhoneNumberCreateParams {
  /**
   * Unique id of agent to bind to newly obtained number. The number will
   * automatically use the agent when doing inbound / outbound calls.
   */
  agent_id: string;

  /**
   * Area code of the number to obtain. Format is a 3 digit integer. Currently only
   * supports US area code.
   */
  area_code?: number;
}

export interface PhoneNumberUpdateParams {
  /**
   * Unique id of agent to bind to number. The number will automatically use the
   * agent when doing inbound / outbound calls.
   */
  agent_id: string;
}

export namespace PhoneNumber {
  export import PhoneNumberResponse = PhoneNumberAPI.PhoneNumberResponse;
  export import PhoneNumberListResponse = PhoneNumberAPI.PhoneNumberListResponse;
  export import PhoneNumberCreateParams = PhoneNumberAPI.PhoneNumberCreateParams;
  export import PhoneNumberUpdateParams = PhoneNumberAPI.PhoneNumberUpdateParams;
}
