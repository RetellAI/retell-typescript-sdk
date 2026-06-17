// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource call', () => {
  // Mock server tests are disabled
  test.skip('createPhoneCall: only required params', async () => {
    const responsePromise = client.call.createPhoneCall({
      from_number: '+14157774444',
      to_number: '+12137774445',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createPhoneCall: required and optional params', async () => {
    const response = await client.call.createPhoneCall({
      from_number: '+14157774444',
      to_number: '+12137774445',
      agent_override: {
        agent: {
          agent_name: 'Jarvis',
          allow_dtmf_interruption: false,
          allow_user_dtmf: true,
          ambient_sound: 'coffee-shop',
          ambient_sound_volume: 1,
          backchannel_frequency: 0.9,
          backchannel_words: ['yeah', 'uh-huh'],
          begin_message_delay_ms: 1000,
          boosted_keywords: ['retell', 'kroger'],
          call_screening_option: {
            agent_identity: 'Acme Health scheduling team',
            call_purpose: 'confirming your appointment for tomorrow',
          },
          custom_stt_config: { endpointing_ms: 0, provider: 'azure' },
          data_storage_retention_days: 30,
          data_storage_setting: 'everything',
          denoising_mode: 'noise-cancellation',
          enable_backchannel: true,
          enable_dynamic_responsiveness: true,
          enable_dynamic_voice_speed: true,
          enable_expressive_mode: true,
          end_call_after_silence_ms: 600000,
          expressive_emotion_tags: ['empathetic', 'excited', 'sigh', 'clear throat', 'emphasis'],
          expressive_mode_prompt: 'Use [sigh] for thoughtful pauses and [excited] for good news.',
          fallback_voice_ids: ['cartesia-Cimo', 'minimax-Cimo'],
          guardrail_config: {
            input_topics: ['platform_integrity_jailbreaking'],
            output_topics: ['harassment'],
          },
          handbook_config: {
            ai_disclosure: true,
            conversational_personality: true,
            default_personality: true,
            echo_verification: true,
            high_empathy: true,
            nato_phonetic_alphabet: true,
            natural_filler_words: true,
            scope_boundaries: true,
            smart_matching: true,
            speech_normalization: true,
          },
          interruption_sensitivity: 1,
          ivr_option: {
            action: { type: 'hangup' },
            detection_prompt: 'detection_prompt',
          },
          language: 'en-US',
          max_call_duration_ms: 3600000,
          opt_in_signed_url: true,
          pii_config: { categories: ['person_name'], mode: 'post_call' },
          post_call_analysis_data: [
            {
              description: 'The name of the customer.',
              name: 'customer_name',
              type: 'string',
              conditional_prompt: 'conditional_prompt',
              examples: ['John Doe', 'Jane Smith'],
              required: true,
            },
          ],
          post_call_analysis_model: 'gpt-4.1-mini',
          pronunciation_dictionary: [
            {
              alphabet: 'ipa',
              phoneme: 'ˈæktʃuəli',
              word: 'actually',
            },
          ],
          reminder_max_count: 2,
          reminder_trigger_ms: 10000,
          response_engine: {
            llm_id: 'llm_234sdertfsdsfsdf',
            type: 'retell-llm',
            version: 0,
          },
          responsiveness: 1,
          ring_duration_ms: 30000,
          signed_url_expiration_ms: 86400000,
          stt_mode: 'fast',
          timezone: 'America/New_York',
          user_dtmf_options: {
            digit_limit: 1,
            termination_key: '#',
            timeout_ms: 1000,
          },
          version_description: 'Customer support agent for handling product inquiries',
          version_title: 'Production hotfix',
          vocab_specialization: 'general',
          voice_emotion: 'calm',
          voice_id: 'retell-Cimo',
          voice_model: 'eleven_turbo_v2',
          voice_speed: 1,
          voice_temperature: 1,
          voicemail_option: {
            action: { text: 'Please give us a callback tomorrow at 10am.', type: 'static_text' },
            detection_prompt: 'detection_prompt',
          },
          volume: 1,
          webhook_events: ['call_started'],
          webhook_timeout_ms: 10000,
          webhook_url: 'https://webhook-url-here',
        },
        conversation_flow: {
          begin_after_user_silence_ms: 2000,
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['kb_001', 'kb_002'],
          model_choice: {
            model: 'gpt-4.1',
            type: 'cascading',
            high_priority: true,
          },
          model_temperature: 0.7,
          start_speaker: 'agent',
          tool_call_strict_mode: true,
        },
        retell_llm: {
          begin_after_user_silence_ms: 2000,
          begin_message: 'Hey I am a virtual assistant calling from Retell Hospital.',
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['string'],
          model: 'gpt-4.1',
          model_high_priority: true,
          model_temperature: 0,
          s2s_model: 'gpt-realtime-1.5',
          start_speaker: 'user',
          tool_call_strict_mode: true,
        },
      },
      custom_sip_headers: { 'X-Custom-Header': 'Custom Value' },
      ignore_e164_validation: true,
      metadata: {},
      override_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      override_agent_version: 1,
      retell_llm_dynamic_variables: { customer_name: 'John Doe' },
    });
  });

  // Mock server tests are disabled
  test.skip('registerPhoneCall: only required params', async () => {
    const responsePromise = client.call.registerPhoneCall({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('registerPhoneCall: required and optional params', async () => {
    const response = await client.call.registerPhoneCall({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      agent_override: {
        agent: {
          agent_name: 'Jarvis',
          allow_dtmf_interruption: false,
          allow_user_dtmf: true,
          ambient_sound: 'coffee-shop',
          ambient_sound_volume: 1,
          backchannel_frequency: 0.9,
          backchannel_words: ['yeah', 'uh-huh'],
          begin_message_delay_ms: 1000,
          boosted_keywords: ['retell', 'kroger'],
          call_screening_option: {
            agent_identity: 'Acme Health scheduling team',
            call_purpose: 'confirming your appointment for tomorrow',
          },
          custom_stt_config: { endpointing_ms: 0, provider: 'azure' },
          data_storage_retention_days: 30,
          data_storage_setting: 'everything',
          denoising_mode: 'noise-cancellation',
          enable_backchannel: true,
          enable_dynamic_responsiveness: true,
          enable_dynamic_voice_speed: true,
          enable_expressive_mode: true,
          end_call_after_silence_ms: 600000,
          expressive_emotion_tags: ['empathetic', 'excited', 'sigh', 'clear throat', 'emphasis'],
          expressive_mode_prompt: 'Use [sigh] for thoughtful pauses and [excited] for good news.',
          fallback_voice_ids: ['cartesia-Cimo', 'minimax-Cimo'],
          guardrail_config: {
            input_topics: ['platform_integrity_jailbreaking'],
            output_topics: ['harassment'],
          },
          handbook_config: {
            ai_disclosure: true,
            conversational_personality: true,
            default_personality: true,
            echo_verification: true,
            high_empathy: true,
            nato_phonetic_alphabet: true,
            natural_filler_words: true,
            scope_boundaries: true,
            smart_matching: true,
            speech_normalization: true,
          },
          interruption_sensitivity: 1,
          ivr_option: {
            action: { type: 'hangup' },
            detection_prompt: 'detection_prompt',
          },
          language: 'en-US',
          max_call_duration_ms: 3600000,
          opt_in_signed_url: true,
          pii_config: { categories: ['person_name'], mode: 'post_call' },
          post_call_analysis_data: [
            {
              description: 'The name of the customer.',
              name: 'customer_name',
              type: 'string',
              conditional_prompt: 'conditional_prompt',
              examples: ['John Doe', 'Jane Smith'],
              required: true,
            },
          ],
          post_call_analysis_model: 'gpt-4.1-mini',
          pronunciation_dictionary: [
            {
              alphabet: 'ipa',
              phoneme: 'ˈæktʃuəli',
              word: 'actually',
            },
          ],
          reminder_max_count: 2,
          reminder_trigger_ms: 10000,
          response_engine: {
            llm_id: 'llm_234sdertfsdsfsdf',
            type: 'retell-llm',
            version: 0,
          },
          responsiveness: 1,
          ring_duration_ms: 30000,
          signed_url_expiration_ms: 86400000,
          stt_mode: 'fast',
          timezone: 'America/New_York',
          user_dtmf_options: {
            digit_limit: 1,
            termination_key: '#',
            timeout_ms: 1000,
          },
          version_description: 'Customer support agent for handling product inquiries',
          version_title: 'Production hotfix',
          vocab_specialization: 'general',
          voice_emotion: 'calm',
          voice_id: 'retell-Cimo',
          voice_model: 'eleven_turbo_v2',
          voice_speed: 1,
          voice_temperature: 1,
          voicemail_option: {
            action: { text: 'Please give us a callback tomorrow at 10am.', type: 'static_text' },
            detection_prompt: 'detection_prompt',
          },
          volume: 1,
          webhook_events: ['call_started'],
          webhook_timeout_ms: 10000,
          webhook_url: 'https://webhook-url-here',
        },
        conversation_flow: {
          begin_after_user_silence_ms: 2000,
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['kb_001', 'kb_002'],
          model_choice: {
            model: 'gpt-4.1',
            type: 'cascading',
            high_priority: true,
          },
          model_temperature: 0.7,
          start_speaker: 'agent',
          tool_call_strict_mode: true,
        },
        retell_llm: {
          begin_after_user_silence_ms: 2000,
          begin_message: 'Hey I am a virtual assistant calling from Retell Hospital.',
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['string'],
          model: 'gpt-4.1',
          model_high_priority: true,
          model_temperature: 0,
          s2s_model: 'gpt-realtime-1.5',
          start_speaker: 'user',
          tool_call_strict_mode: true,
        },
      },
      agent_version: 1,
      direction: 'inbound',
      from_number: '+14157774444',
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'John Doe' },
      to_number: '+12137774445',
    });
  });

  // Mock server tests are disabled
  test.skip('createWebCall: only required params', async () => {
    const responsePromise = client.call.createWebCall({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createWebCall: required and optional params', async () => {
    const response = await client.call.createWebCall({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      agent_override: {
        agent: {
          agent_name: 'Jarvis',
          allow_dtmf_interruption: false,
          allow_user_dtmf: true,
          ambient_sound: 'coffee-shop',
          ambient_sound_volume: 1,
          backchannel_frequency: 0.9,
          backchannel_words: ['yeah', 'uh-huh'],
          begin_message_delay_ms: 1000,
          boosted_keywords: ['retell', 'kroger'],
          call_screening_option: {
            agent_identity: 'Acme Health scheduling team',
            call_purpose: 'confirming your appointment for tomorrow',
          },
          custom_stt_config: { endpointing_ms: 0, provider: 'azure' },
          data_storage_retention_days: 30,
          data_storage_setting: 'everything',
          denoising_mode: 'noise-cancellation',
          enable_backchannel: true,
          enable_dynamic_responsiveness: true,
          enable_dynamic_voice_speed: true,
          enable_expressive_mode: true,
          end_call_after_silence_ms: 600000,
          expressive_emotion_tags: ['empathetic', 'excited', 'sigh', 'clear throat', 'emphasis'],
          expressive_mode_prompt: 'Use [sigh] for thoughtful pauses and [excited] for good news.',
          fallback_voice_ids: ['cartesia-Cimo', 'minimax-Cimo'],
          guardrail_config: {
            input_topics: ['platform_integrity_jailbreaking'],
            output_topics: ['harassment'],
          },
          handbook_config: {
            ai_disclosure: true,
            conversational_personality: true,
            default_personality: true,
            echo_verification: true,
            high_empathy: true,
            nato_phonetic_alphabet: true,
            natural_filler_words: true,
            scope_boundaries: true,
            smart_matching: true,
            speech_normalization: true,
          },
          interruption_sensitivity: 1,
          ivr_option: {
            action: { type: 'hangup' },
            detection_prompt: 'detection_prompt',
          },
          language: 'en-US',
          max_call_duration_ms: 3600000,
          opt_in_signed_url: true,
          pii_config: { categories: ['person_name'], mode: 'post_call' },
          post_call_analysis_data: [
            {
              description: 'The name of the customer.',
              name: 'customer_name',
              type: 'string',
              conditional_prompt: 'conditional_prompt',
              examples: ['John Doe', 'Jane Smith'],
              required: true,
            },
          ],
          post_call_analysis_model: 'gpt-4.1-mini',
          pronunciation_dictionary: [
            {
              alphabet: 'ipa',
              phoneme: 'ˈæktʃuəli',
              word: 'actually',
            },
          ],
          reminder_max_count: 2,
          reminder_trigger_ms: 10000,
          response_engine: {
            llm_id: 'llm_234sdertfsdsfsdf',
            type: 'retell-llm',
            version: 0,
          },
          responsiveness: 1,
          ring_duration_ms: 30000,
          signed_url_expiration_ms: 86400000,
          stt_mode: 'fast',
          timezone: 'America/New_York',
          user_dtmf_options: {
            digit_limit: 1,
            termination_key: '#',
            timeout_ms: 1000,
          },
          version_description: 'Customer support agent for handling product inquiries',
          version_title: 'Production hotfix',
          vocab_specialization: 'general',
          voice_emotion: 'calm',
          voice_id: 'retell-Cimo',
          voice_model: 'eleven_turbo_v2',
          voice_speed: 1,
          voice_temperature: 1,
          voicemail_option: {
            action: { text: 'Please give us a callback tomorrow at 10am.', type: 'static_text' },
            detection_prompt: 'detection_prompt',
          },
          volume: 1,
          webhook_events: ['call_started'],
          webhook_timeout_ms: 10000,
          webhook_url: 'https://webhook-url-here',
        },
        conversation_flow: {
          begin_after_user_silence_ms: 2000,
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['kb_001', 'kb_002'],
          model_choice: {
            model: 'gpt-4.1',
            type: 'cascading',
            high_priority: true,
          },
          model_temperature: 0.7,
          start_speaker: 'agent',
          tool_call_strict_mode: true,
        },
        retell_llm: {
          begin_after_user_silence_ms: 2000,
          begin_message: 'Hey I am a virtual assistant calling from Retell Hospital.',
          kb_config: { filter_score: 0.6, top_k: 3 },
          knowledge_base_ids: ['string'],
          model: 'gpt-4.1',
          model_high_priority: true,
          model_temperature: 0,
          s2s_model: 'gpt-realtime-1.5',
          start_speaker: 'user',
          tool_call_strict_mode: true,
        },
      },
      agent_version: 1,
      current_node_id: 'collect_info',
      current_state: 'information_collection',
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'John Doe' },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.call.retrieve('119c3f8e47135a29e65947eeb34cf12d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.call.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.list(
        {
          filter_criteria: {
            agent: [{ agent_id: 'x', version: [0] }],
            batch_call_id: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            call_id: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            call_status: {
              op: 'in',
              type: 'enum',
              value: ['not_connected'],
            },
            call_successful: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
            call_type: {
              op: 'in',
              type: 'enum',
              value: ['web_call'],
            },
            combined_cost: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            custom_analysis_data: [
              {
                op: 'eq',
                type: 'string',
                value: 'value',
                key: 'key',
              },
            ],
            custom_attributes: [
              {
                op: 'eq',
                type: 'string',
                value: 'value',
                key: 'key',
              },
            ],
            data_storage_setting: {
              op: 'in',
              type: 'enum',
              value: ['everything'],
            },
            direction: {
              op: 'in',
              type: 'enum',
              value: ['inbound'],
            },
            disconnection_reason: {
              op: 'in',
              type: 'enum',
              value: ['user_hangup'],
            },
            duration_ms: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            dynamic_variables: [
              {
                key: 'key',
                op: 'eq',
                type: 'string',
                value: 'value',
              },
            ],
            e2e_latency_p50: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            end_timestamp: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            from_number: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            in_voicemail: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
            metadata: [
              {
                op: 'eq',
                type: 'string',
                value: 'value',
                key: 'key',
              },
            ],
            start_timestamp: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            to_number: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            tool_calls: [
              {
                latency_ms: {
                  op: 'eq',
                  type: 'number',
                  value: 0,
                },
                name: 'name',
                success: {
                  op: 'eq',
                  type: 'boolean',
                  value: true,
                },
                type: 'type',
              },
            ],
            user_sentiment: {
              op: 'in',
              type: 'enum',
              value: ['Negative'],
            },
          },
          include_total: true,
          limit: 1000,
          pagination_key: 'pagination_key',
          skip: 0,
          sort_order: 'ascending',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.call.update('call_a4441234567890777c4a4a123e6', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('stop', async () => {
    const responsePromise = client.call.stop('call_a4441234567890777c4a4a123e6');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.call.delete('119c3f8e47135a29e65947eeb34cf12d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
