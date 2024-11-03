// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class PhoneNumber extends APIResource {
  /**
   * Buy a new phone number & Bind agents
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

  /**
   * Import a phone number from custom telephony & Bind agents
   */
  import(body: PhoneNumberImportParams, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberResponse> {
    return this._client.post('/import-phone-number', { body, ...options });
  }
}

export interface PhoneNumberResponse {
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
   * Area code of the number to obtain. Format is a 3 digit integer. Currently only
   * supports US area code.
   */
  area_code?: number;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string | null;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If null, this number would not be able to
   * initiate outbound call without agent id override.
   */
  outbound_agent_id?: string | null;

  /**
   * Pretty printed phone number, provided for your reference.
   */
  phone_number_pretty?: string;
}

export type PhoneNumberListResponse = Array<PhoneNumberResponse>;

export interface PhoneNumberCreateParams {
  /**
   * Area code of the number to obtain. Format is a 3 digit integer. Currently only
   * supports US area code.
   */
  area_code?: number;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If null, this number would not be able to
   * initiate outbound call without agent id override.
   */
  outbound_agent_id?: string | null;
}

export interface PhoneNumberUpdateParams {
  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If set to null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string | null;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If set to null, this number would not be
   * able to initiate outbound call without agent id override.
   */
  outbound_agent_id?: string | null;
}

export interface PhoneNumberImportParams {
  /**
   * The number you are trying to import in E.164 format of the number (+country
   * code, then number with no space, no special characters), used as the unique
   * identifier for phone number APIs.
   */
  phone_number: string;

  /**
   * The termination uri to uniquely identify your elastic SIP trunk. This is used
   * for outbound calls. For Twilio elastic SIP trunks it always end with
   * ".pstn.twilio.com".
   */
  termination_uri: string;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If null, this number would not be able to
   * initiate outbound call without agent id override.
   */
  outbound_agent_id?: string | null;

  /**
   * The password used for authentication for the SIP trunk.
   */
  sip_trunk_auth_password?: string;

  /**
   * The username used for authentication for the SIP trunk.
   */
  sip_trunk_auth_username?: string;
}

export declare namespace PhoneNumber {
  export {
    type PhoneNumberResponse as PhoneNumberResponse,
    type PhoneNumberListResponse as PhoneNumberListResponse,
    type PhoneNumberCreateParams as PhoneNumberCreateParams,
    type PhoneNumberUpdateParams as PhoneNumberUpdateParams,
    type PhoneNumberImportParams as PhoneNumberImportParams,
  };
}
