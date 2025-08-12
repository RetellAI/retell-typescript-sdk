// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class PhoneNumber extends APIResource {
  /**
   * Buy a new phone number & Bind agents
   *
   * @example
   * ```ts
   * const phoneNumberResponse =
   *   await client.phoneNumber.create();
   * ```
   */
  create(body: PhoneNumberCreateParams, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberResponse> {
    return this._client.post('/create-phone-number', { body, ...options });
  }

  /**
   * Retrieve details of a specific phone number
   *
   * @example
   * ```ts
   * const phoneNumberResponse =
   *   await client.phoneNumber.retrieve('+14157774444');
   * ```
   */
  retrieve(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<PhoneNumberResponse> {
    return this._client.get(`/get-phone-number/${phoneNumber}`, options);
  }

  /**
   * Update agent bound to a purchased phone number
   *
   * @example
   * ```ts
   * const phoneNumberResponse = await client.phoneNumber.update(
   *   '+14157774444',
   *   {
   *     inbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   *     nickname: 'Frontdesk Number',
   *     outbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   *   },
   * );
   * ```
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
   *
   * @example
   * ```ts
   * const phoneNumberResponses =
   *   await client.phoneNumber.list();
   * ```
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PhoneNumberListResponse> {
    return this._client.get('/list-phone-numbers', options);
  }

  /**
   * Delete an existing phone number
   *
   * @example
   * ```ts
   * await client.phoneNumber.delete('+14157774444');
   * ```
   */
  delete(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-phone-number/${phoneNumber}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Import a phone number from custom telephony & Bind agents
   *
   * @example
   * ```ts
   * const phoneNumberResponse = await client.phoneNumber.import(
   *   {
   *     phone_number: '+14157774444',
   *     termination_uri: 'someuri.pstn.twilio.com',
   *   },
   * );
   * ```
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
   * Version of the inbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  inbound_agent_version?: number | null;

  /**
   * If set, will send a webhook for inbound calls, where you can to override agent
   * id, set dynamic variables and other fields specific to that call.
   */
  inbound_webhook_url?: string | null;

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
   * Version of the outbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  outbound_agent_version?: number | null;

  /**
   * Pretty printed phone number, provided for your reference.
   */
  phone_number_pretty?: string;

  /**
   * Type of the phone number.
   */
  phone_number_type?: 'retell-twilio' | 'retell-telnyx' | 'custom';
}

export type PhoneNumberListResponse = Array<PhoneNumberResponse>;

export interface PhoneNumberCreateParams {
  /**
   * Area code of the number to obtain. Format is a 3 digit integer. Currently only
   * supports US area code.
   */
  area_code?: number;

  /**
   * The ISO 3166-1 alpha-2 country code of the number you are trying to purchase. If
   * left empty, will default to "US".
   */
  country_code?: 'US' | 'CA';

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Version of the inbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  inbound_agent_version?: number | null;

  /**
   * If set, will send a webhook for inbound calls, where you can to override agent
   * id, set dynamic variables and other fields specific to that call.
   */
  inbound_webhook_url?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string;

  /**
   * The provider to purchase the phone number from. Default to twilio.
   */
  number_provider?: 'twilio' | 'telnyx';

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If null, this number would not be able to
   * initiate outbound call without agent id override.
   */
  outbound_agent_id?: string | null;

  /**
   * Version of the outbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  outbound_agent_version?: number | null;

  /**
   * The number you are trying to purchase in E.164 format of the number (+country
   * code then number with no space and no special characters).
   */
  phone_number?: string;

  /**
   * Whether to purchase a toll-free number. Toll-free numbers incur higher costs.
   */
  toll_free?: boolean;
}

export interface PhoneNumberUpdateParams {
  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when receiving inbound calls. If set to null, this number would not accept
   * inbound call.
   */
  inbound_agent_id?: string | null;

  /**
   * Version of the inbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  inbound_agent_version?: number | null;

  /**
   * If set, will send a webhook for inbound calls, where you can to override agent
   * id, set dynamic variables and other fields specific to that call.
   */
  inbound_webhook_url?: string | null;

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

  /**
   * Version of the outbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  outbound_agent_version?: number | null;
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
   * Version of the inbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  inbound_agent_version?: number | null;

  /**
   * If set, will send a webhook for inbound calls, where you can to override agent
   * id, set dynamic variables and other fields specific to that call.
   */
  inbound_webhook_url?: string | null;

  /**
   * Nickname of the number. This is for your reference only.
   */
  nickname?: string;

  /**
   * Unique id of agent to bind to the number. The number will automatically use the
   * agent when conducting outbound calls. If null, this number would not be able to
   * initiate outbound call without agent id override.
   */
  outbound_agent_id?: string;

  /**
   * Version of the outbound agent to bind to the number. If not provided, will
   * default to latest version.
   */
  outbound_agent_version?: number | null;

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
