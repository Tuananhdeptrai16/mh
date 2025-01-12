import { isArray, isEmpty, isObject, isString } from 'src/shared/utils/Typeof';
import {
  BYPASS_SAVE_SERVER,
  KEY_EMPTY_SELECT,
} from 'src/shared/constants/Default';
import { toPairs } from 'lodash';
import {
  camelToSnakeCase,
  extractViewTableAndColumns,
  parse,
} from 'src/shared/utils/String';
import Lexer from 'src/@crema/tokenizer/lexer';
import Parser from 'src/@crema/tokenizer/parser';
import { MODE_QUERY_JOB } from '../constants/DataFixed';
import { handleAnalyzeSQL } from 'src/shared/utils/Array';
import { REACT_APP_SECRET_KEY } from '../constants/serverConfig';
import forge from 'node-forge';

export const handleRedundantData = (value, key = '') => {
  if (isArray(value)) {
    return value
      .map((item) => {
        return handleRedundantData(item);
      })
      .filter((f) => !isEmpty(f));
  } else if (isObject(value)) {
    toPairs(value).forEach(([keyItem, valueItem]) => {
      value[keyItem] = handleRedundantData(valueItem, keyItem);
    });
    return value;
  }
  // value empty mặc định select
  if (isString(value) && value?.includes(KEY_EMPTY_SELECT)) {
    return value;
  }

  // if (value instanceof moment) {
  //   return value.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // }

  if (key && key.toLowerCase().includes('password')) {
    // password k trim
    return value;
  }

  if (isString(value)) {
    const valueStr = value.trim();
    if (isEmpty(valueStr)) return undefined;
    return valueStr;
  }
  return value;
};

export const convertDataConnectionUpdate = (
  data,
  connectionId,
  sync_catalog = [],
) => {
  const scheduleType = data?.schedule_type;
  const scheduleData = {};

  if (scheduleType === 'basic') {
    scheduleData.basic_schedule = {
      units: data?.replication_frequency,
      time_unit: 'hours',
    };
  }
  if (scheduleType === 'cron') {
    scheduleData.cron = {
      cron_time_zone: 'Asia/Ho_Chi_Minh',
      cron_expression: data?.cron_expression,
    };
  }

  return {
    connection_id: connectionId,
    source_id: data?.source?.source_id,
    destination_id: data?.destination?.destination_id,
    name: data?.name,
    schedule_type: data?.schedule_type,
    schedule_data: scheduleType === 'manual' ? undefined : scheduleData,
    namespace_definition: 'destination',
    prefix: '',
    non_breaking_changes_preference: data?.non_breaking_changes_preference,
    geography: 'auto',
    sync_catalog: {
      streams: sync_catalog,
    },
    status: 'active',
  };
};

export const runPromiseAsync = (...promises) => {
  if (promises.length > 1) {
    promises[0].then(() => {
      runPromiseAsync(...promises.slice(1));
    });
  } else if (promises.length > 0) {
    promises[0].then((rs) => {
      console.log(rs);
    });
  }
};

export const getNameAirbyte = (nameRaw) => {
  const spitName = (nameRaw || '').split('__');

  return spitName?.[2] || spitName?.[0];
};

const fieldIgnore = ['properties'];

export const convertObjectKeyToSnakeCase = (object) => {
  if (isObject(object)) {
    const newObject = {};
    Object.keys(object).forEach((key) => {
      const value = convertObjectKeyToSnakeCase(object[key]);
      if (key === 'name' && isString(value)) {
        newObject[camelToSnakeCase(key)] = getNameAirbyte(value);
      } else if (fieldIgnore.includes(key)) {
        newObject[key] = value;
      } else {
        newObject[camelToSnakeCase(key)] = value;
      }
    });
    return newObject;
  } else if (isArray(object)) {
    return object.map((item) => convertObjectKeyToSnakeCase(item));
  }

  return object;
};

export const reduceTask = (arr, callback) => {
  if (isArray(arr) && !isEmpty(arr)) {
    const valueRun = arr.pop();
    return new Promise((resolve) => {
      callback(valueRun).then((rs) => {
        if (isEmpty(arr)) {
          resolve([rs]);
        } else {
          reduceTask(arr, callback).then((rsTaskNext) => {
            resolve([...rsTaskNext, rs]);
          });
        }
      });
    });
  }

  return BYPASS_SAVE_SERVER();
};

export const convertDataCreateBuilderApi = (data) => {
  const method_auth_type = data?.method_auth_type;

  const api_token = data?.connection_specification?.find(
    (item) => item?.id === 'api_key',
  );
  const usernameInput = data?.connection_specification?.find(
    (item) => item?.id === 'username',
  );
  const passwordInput = data?.connection_specification?.find(
    (item) => item?.id === 'password',
  );

  const clientIdInput = data?.connection_specification?.find(
    (item) => item?.id === 'client_id',
  );
  const clientSecretInput = data?.connection_specification?.find(
    (item) => item?.id === 'client_secret',
  );
  const refreshTokenInput = data?.connection_specification?.find(
    (item) => item?.id === 'client_refresh_token',
  );

  return {
    version: '0.89.0',
    type: 'DeclarativeSource',
    check: {
      type: 'CheckStream',
      stream_names:
        data?.list_source_schema?.map((item) => item?.name_schema) || [],
    },
    definitions: {
      streams: isEmpty(data?.list_source_schema)
        ? {}
        : data?.list_source_schema?.reduce((init, item) => {
            init[item?.name_schema] = {
              type: 'DeclarativeStream',
              name: item?.name_schema,
              ...(!isEmpty(item?.primary_key) && {
                primary_key: item?.primary_key?.map((key) => key),
              }),
              retriever: {
                type: 'SimpleRetriever',
                requester: {
                  $ref: '#/definitions/base_requester',
                  path: item?.url_path,
                  http_method: item?.http_request || 'GET',
                  ...(!isEmpty(item?.request_parameters_setting_schema) && {
                    request_parameters:
                      (item?.request_parameters_setting_schema || [])?.reduce(
                        (init, current) => {
                          init[current?.key_request_parameters_setting_schema] =
                            current?.value_request_parameters_setting_schema;
                          return init;
                        },
                        {},
                      ) || {},
                  }),
                  ...(!isEmpty(item?.request_headers) && {
                    request_headers:
                      item?.request_headers?.reduce((init, current) => {
                        init[current?.key_request_headers] =
                          current?.value_request_headers;
                        return init;
                      }, {}) || {},
                  }),
                  ...(!isEmpty(item?.request_body_json) &&
                    item?.type_request_body_setting === 'request_body_json' && {
                      request_body_json:
                        item?.request_body_json?.reduce((init, current) => {
                          init[current?.key_request_body_json] =
                            current?.value_request_body_json;
                          return init;
                        }, {}) || {},
                    }),
                  ...(!isEmpty(item?.request_body_data) &&
                    item?.type_request_body_setting === 'request_body_data' && {
                      request_body_data: item?.request_body_data,
                    }),
                },
                record_selector: {
                  type: 'RecordSelector',
                  extractor: {
                    type: 'DpathExtractor',
                    field_path: item?.field_path || [],
                  },
                  ...(item?.record_filter && {
                    record_filter: {
                      type: 'RecordFilter',
                      condition: `{{${item?.record_filter}}}`,
                    },
                  }),
                  ...(item?.schema_normalization && {
                    schema_normalization: 'Default',
                  }),
                },
                ...(item?.pagination_show && {
                  paginator: {
                    type: 'DefaultPaginator',
                    pagination_strategy: {
                      type: item?.pagination?.pagination_strategy,
                      ...(item?.pagination?.page_size && {
                        page_size: item?.pagination?.page_size,
                      }),
                      ...(item?.pagination?.page_size_pageIncrement && {
                        page_size: item?.pagination?.page_size_pageIncrement,
                      }),
                      ...(item?.pagination?.page_size_cursorPagination && {
                        page_size: item?.pagination?.page_size_cursorPagination,
                      }),
                      ...(item?.pagination?.cursor_value && {
                        cursor_value: `{{ response${item?.pagination?.cursor_value.reduce(
                          (acc, curr) => `${acc}.get("${curr}", {})`,
                          '',
                        )} }}`,
                        stop_condition: `{{ not response${item?.pagination?.cursor_value.reduce(
                          (acc, curr) => `${acc}.get("${curr}", {})`,
                          '',
                        )} }}`,
                      }),
                      ...(item?.pagination?.start_from_page && {
                        start_from_page: item?.pagination?.start_from_page,
                      }),
                      inject_on_first_request: Boolean(
                        item?.pagination?.inject_on_first_request,
                      ),
                    },
                    ...(item?.pagination?.page_size_option && {
                      page_size_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_size_option_inject_into,
                        field_name:
                          item?.pagination?.page_size_option_field_name,
                      },
                    }),
                    ...(item?.pagination?.page_size_option_pageIncrement && {
                      page_size_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_size_option_inject_into,
                        field_name:
                          item?.pagination?.page_size_option_field_name,
                      },
                    }),
                    ...(item?.pagination?.page_size_option_cursor && {
                      page_size_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_size_option_inject_into,
                        field_name:
                          item?.pagination?.page_size_option_field_name,
                      },
                    }),

                    ...(item?.pagination?.page_token_option && {
                      page_token_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_token_option_inject_into,
                        field_name:
                          item?.pagination?.page_token_option_field_name,
                      },
                    }),
                    ...(item?.pagination?.page_token_option_pageIncrement && {
                      page_token_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_token_option_inject_into,
                        field_name:
                          item?.pagination?.page_token_option_field_name,
                      },
                    }),
                    ...(item?.pagination?.page_token_option_cursor && {
                      page_token_option: {
                        type: 'RequestOption',
                        inject_into:
                          item?.pagination?.page_token_option_inject_into,
                        field_name:
                          item?.pagination?.page_token_option_field_name,
                      },
                    }),
                  },
                }),
                ...(item?.listPartitionRouter && {
                  partition_router: {
                    type: 'ListPartitionRouter',
                    values: item?.listPartitionRouter_values || [],
                    cursor_field: item?.listPartitionRouter_cursor_field,
                    request_option: {
                      inject_into: item?.listPartitionRouter_inject_into,
                      type: 'RequestOption',
                      field_name: item?.listPartitionRouter_field_name,
                    },
                  },
                }),
              },
              ...(item?.is_transformation && {
                transformations: [
                  {
                    type: item?.transformation_type,
                    ...(item?.item?.transformation_type === 'RemoveFields' && {
                      field_pointers: [[item?.transformation_path]],
                    }),
                    ...(item?.item?.transformation_type === 'AddFields' && {
                      fields: [
                        {
                          path: item?.transformation_path_add,
                          value: item?.transformation_value,
                        },
                      ],
                    }),
                  },
                ],
              }),
              schema_loader: {
                type: 'InlineSchemaLoader',
                schema: {
                  $ref: `#/schemas/${item?.name_schema}`,
                },
              },
            };
            return init;
          }, {}) || {},

      base_requester: {
        type: 'HttpRequester',
        url_base: data?.url_base,
        authenticator:
          method_auth_type === 'not_auth'
            ? {}
            : {
                type: method_auth_type,
                ...(method_auth_type === 'ApiKeyAuthenticator' && {
                  inject_into: {
                    type: 'RequestOption',
                    inject_into: data?.inject_into,
                    field_name: data?.field_name_inject_into,
                  },
                  api_token: `{{ config["${api_token?.id_input_user}"] }}`,
                }),
                ...(method_auth_type === 'BearerAuthenticator' && {
                  api_token: `{{ config["${api_token?.id_input_user}"] }}`,
                }),
                ...(method_auth_type === 'BasicHttpAuthenticator' && {
                  username: `{{ config["${usernameInput?.id_input_user}"] }}`,
                  password: `{{ config["${passwordInput?.id_input_user}"] }}`,
                }),
                ...(method_auth_type === 'OAuthAuthenticator' && {
                  refresh_request_body:
                    data?.refresh_request_body?.reduce((init, item) => {
                      init[item?.key_refresh_request_body] =
                        item?.value_refresh_request_body;
                      return init;
                    }, {}) || {},
                  token_refresh_endpoint: data?.token_refresh_endpoint,
                  grant_type: data?.grant_type,
                  client_id: `{{ config["${clientIdInput?.id_input_user}"] }}`,
                  client_secret: `{{ config["${clientSecretInput?.id_input_user}"] }}`,
                  refresh_token: `{{ config["${refreshTokenInput?.id_input_user}"] }}`,

                  scopes: data?.scopes?.map((item) => item),
                  token_expiry_date_format:
                    data?.token_expiry_date_format || '',
                  expires_in_name: data?.expires_in_name || '',
                  access_token_name: data?.access_token_name || '',
                }),
                ...(method_auth_type === 'SessionTokenAuthenticator' && {
                  login_requester: {
                    type: 'HttpRequester',
                    url_base: data?.url_base_session_token,
                    path: '/',
                    authenticator: {
                      type: 'NoAuth',
                    },
                    http_method: data?.http_method_session_token,
                    request_parameters:
                      data?.request_parameters?.reduce((current, item) => {
                        current[item?.key_request_parameters] =
                          item?.value_request_parameters;
                        return current;
                      }, {}) || {},
                    request_headers:
                      data?.request_headers?.reduce((current, item) => {
                        current[item?.key_request_headers] =
                          item?.value_request_headers;
                        return current;
                      }, {}) || {},
                    ...(data?.type_request_body_session ===
                      'request_body_json' && {
                      request_body_json:
                        data?.request_body_json?.reduce((current, item) => {
                          current[item?.key_request_body_json] =
                            item?.value_request_body_json;
                          return current;
                        }, {}) || {},
                    }),
                    ...(data?.type_request_body_session ===
                      'request_body_data' && {
                      request_body_data: data?.request_body_data || '',
                    }),
                  },
                  session_token_path:
                    data?.session_token_path?.map((item) => item) || [],
                  expiration_duration:
                    data?.expiration_duration_session_token || '',
                  request_authentication: {
                    type: data?.type_request_authentication,
                    ...(data?.type_request_authentication === 'ApiKey' && {
                      inject_into: {
                        type: 'RequestOption',
                        inject_into: data?.inject_into,
                        field_name: data?.field_name_inject_into,
                      },
                    }),
                  },
                }),
              },
      },
    },
    streams:
      data?.list_source_schema?.map((item) => {
        return {
          $ref: `#/definitions/streams/${item?.name_schema}`,
        };
      }) || [],
    spec: {
      type: 'Spec',
      connection_specification: {
        type: 'object',
        $schema: 'http://json-schema.org/draft-07/schema#',
        required:
          data?.connection_specification
            ?.filter((item) => item?.required_field_input_user === true)
            ?.map((value) => value?.id_input_user) || [],
        properties:
          data?.connection_specification?.reduce((init, item, index) => {
            init[item?.id_input_user] = {
              type: item?.type_input_user,
              title: item?.title_input_user,
              ...(item?.hint_input_user && {
                description: item?.hint_input_user,
              }),
              ...(item?.secret_field_input_user && {
                airbyte_secret: Boolean(item?.secret_field_input_user),
              }),
              ...(item?.default_value_input_user && {
                default: item?.default_value_input_user,
              }),
              ...(item?.always_show && {
                always_show: item?.always_show,
              }),
              order: index,
            };
            return init;
          }, {}) || {},
        additionalProperties: true,
      },
    },
    metadata: {
      autoImportSchema: isEmpty(data?.list_source_schema)
        ? {}
        : data?.list_source_schema?.reduce((init, item) => {
            init[item?.name_schema] = true;
            return init;
          }, {}) || {},
    },
    schemas: isEmpty(data?.list_source_schema)
      ? {}
      : data?.list_source_schema?.reduce((init, item) => {
          init[item?.name_schema] = {
            type: 'object',
            $schema: 'http://json-schema.org/draft-07/schema#',
            additionalProperties: true,
            properties: {},
          };
          return init;
        }, {}) || {},
  };
};

export const parseDataCreateBuilderApi = (data) => {
  const parseConfigApiServer = isEmpty(data?.manifest)
    ? {}
    : parse(data?.manifest);
  const manifestServer =
    parseConfigApiServer?.declarativeManifest?.manifest || {};

  const objectConnectionSpecification =
    manifestServer?.spec?.connection_specification?.properties || {};
  const objectStreams = manifestServer?.definitions?.streams || {};

  return {
    ...data,
    spec: manifestServer?.spec?.connection_specification || {},
    url_base: manifestServer?.definitions?.base_requester?.url_base,
    method_auth_type:
      manifestServer?.definitions?.base_requester?.authenticator?.type ||
      'not_auth',
    inject_into:
      manifestServer?.definitions?.base_requester?.authenticator?.inject_into
        ?.inject_into || '',
    field_name_inject_into:
      manifestServer?.definitions?.base_requester?.authenticator?.inject_into
        ?.field_name || '',
    connection_specification:
      Object.keys(objectConnectionSpecification).map((key) => {
        return {
          default_value_input_user: objectConnectionSpecification[key]?.default,
          enable_default_value_input_user: Boolean(
            objectConnectionSpecification[key]?.default,
          ),
          hint_input_user: objectConnectionSpecification[key]?.description,
          id_input_user: key,
          id: key,
          required_field_input_user:
            manifestServer?.spec?.connection_specification?.required?.includes(
              key,
            ),
          secret_field_input_user: Boolean(
            objectConnectionSpecification[key]?.airbyte_secret,
          ),
          title_input_user: objectConnectionSpecification[key]?.title,
          type_input_user: objectConnectionSpecification[key]?.type,
        };
      }) || [],
    list_source_schema:
      Object.keys(objectStreams).map((key) => {
        return {
          name_schema: key,
          url_path: objectStreams[key]?.retriever?.requester?.path,
          http_request: objectStreams[key]?.retriever?.requester?.http_method,
          primary_key: objectStreams[key]?.primary_key,
          record_selector: true,
          field_path:
            objectStreams[key]?.retriever?.record_selector?.extractor
              ?.field_path || [],
          is_partition_router_inject_into: true,
          is_transformation: true,
          key: key,
          listPartitionRouter: true,
          listPartitionRouter_cursor_field:
            objectStreams[key]?.retriever?.partition_router?.cursor_field,
          listPartitionRouter_field_name:
            objectStreams[key]?.retriever?.partition_router?.request_option
              ?.field_name,
          listPartitionRouter_inject_into:
            objectStreams[key]?.retriever?.partition_router?.request_option
              ?.inject_into,
          listPartitionRouter_values:
            objectStreams[key]?.retriever?.partition_router?.values || [],
          pagination: {
            pagination_strategy:
              objectStreams[key]?.retriever?.paginator?.pagination_strategy
                ?.type,
            page_size:
              objectStreams[key]?.retriever?.paginator?.pagination_strategy
                ?.page_size,
            page_token_option:
              objectStreams[key]?.retriever?.paginator?.page_token_option,
            page_size_option:
              objectStreams[key]?.retriever?.paginator?.page_size_option,
          },
          pagination_show: Boolean(objectStreams[key]?.retriever?.paginator),
          record_filter:
            objectStreams[key]?.retriever?.record_selector?.record_filter
              ?.condition,
          request_headers: Object.entries(
            objectStreams[key]?.retriever?.requester?.request_headers || [],
          ).map(([key, value]) => {
            return {
              key_request_headers: key,
              value_request_headers: value,
            };
          }),
          request_parameters_setting_schema: Object.entries(
            objectStreams[key]?.retriever?.requester?.request_parameters || [],
          ).map(([key, value]) => {
            return {
              key_request_parameters_setting_schema: key,
              value_request_parameters_setting_schema: value,
            };
          }),
          schema_normalization: Boolean(
            objectStreams[key]?.retriever?.record_selector
              ?.schema_normalization,
          ),
          transformation_path: [],
          transformation_type: isEmpty(objectStreams[key]?.transformations)
            ? ''
            : objectStreams[key]?.transformations[0]?.type,
          request_body_json: Object.entries(
            objectStreams[key]?.retriever?.requester?.request_body_json || [],
          ).map(([key, value]) => {
            return {
              key_request_body_json: key,
              value_request_body_json: value,
            };
          }),
          request_body_data:
            objectStreams[key]?.retriever?.requester?.request_body_data,
          type_request_body_setting: isEmpty(
            objectStreams[key]?.retriever?.requester?.request_body_json,
          )
            ? 'request_body_data'
            : 'request_body_json',
        };
      }) || [],
  };
};

export const variableListColumn = (listColumn) => {
  const result = {};
  (listColumn || [])?.forEach((item) => {
    const key = item?.nameColumn;
    if (isEmpty(item?.data_type)) {
      result[key] = key;
    } else {
      result[key] = item?.data_type;
    }
  });

  return result;
};
export function evaluateCondition(expression, variables = {}) {
  const lexer = new Lexer(expression);
  const parser = new Parser(lexer);
  return parser.parse(variables);
}

export const renderModeSchedule = (data) => {
  const modeSchedule = data?.mode_scheduler;
  if (modeSchedule === 'mode_cron') {
    return {
      cron_expression: data?.cron_expression || data?.scheduler,
      is_auto_update: '',
      quantity: '',
      unit: '',
    };
  }
  if (modeSchedule === 'mode_auto') {
    return {
      cron_expression: '',
      is_auto_update: data?.is_auto_update,
      quantity: '',
      unit: '',
    };
  }
  if (modeSchedule === 'mode_schedule') {
    return {
      cron_expression: '',
      is_auto_update: '',
      quantity: Number.parseInt(data?.quantity),
      unit: data?.unit,
    };
  }
};

export const renderDataCreateJob = (data) => {
  const type = data?.keyModeQuey;

  return {
    ...data,
    config_fields: '',
    sql: '',
    rules: '',
    group_by: '',
    keyModeQuey: '',
    config_condition: '',
    config_tables: '',
    is_code_sql_expression: Boolean(type === MODE_QUERY_JOB.QUERY_CODE),
    ...(type === MODE_QUERY_JOB.QUERY_CODE && {
      op2: {
        ...data,
        table_view: extractViewTableAndColumns(handleAnalyzeSQL(data?.sql))
          ?.table,
        sql: data?.sql || '',
      },
      op1: null,
    }),
    ...(type === MODE_QUERY_JOB.SELECT_QUERY && {
      op2: null,
      op1: {
        ...data,
        sql: null,
      },
    }),
  };
};

export const renderKeyModeQueryDetail = (dataDetail) => {
  const is_code_sql_expression = dataDetail?.is_code_sql_expression;
  if (is_code_sql_expression) {
    return MODE_QUERY_JOB.QUERY_CODE;
  }
  return MODE_QUERY_JOB.SELECT_QUERY;
};

// export async function encryptObject(obj, secretKey) {
//   const jsonString = JSON.stringify(obj); // Convert object to JSON string

//   // Convert secret key to a CryptoKey
//   const key = await crypto.subtle.importKey(
//     'raw',
//     new TextEncoder().encode(secretKey),
//     'AES-GCM',
//     false,
//     ['encrypt'],
//   );

//   // Generate a random initialization vector (IV)
//   const iv = crypto.getRandomValues(new Uint8Array(12));

//   // Encrypt the JSON string
//   const encryptedBuffer = await crypto.subtle.encrypt(
//     { name: 'AES-GCM', iv },
//     key,
//     new TextEncoder().encode(jsonString),
//   );

//   // Combine IV and encrypted data
//   const combinedArray = new Uint8Array(iv.length + encryptedBuffer.byteLength);
//   combinedArray.set(iv);
//   combinedArray.set(new Uint8Array(encryptedBuffer), iv.length);

//   // Convert to Base64 for easy transport
//   return btoa(String.fromCharCode.apply(null, combinedArray));
// }

// export async function decryptObject(encryptedData, secretKey) {
//   // Convert Base64 string back to Uint8Array
//   const combinedArray = Uint8Array.from(atob(encryptedData), (c) =>
//     c.charCodeAt(0),
//   );

//   // Extract IV and encrypted data
//   const iv = combinedArray.slice(0, 12); // First 12 bytes are the IV
//   const encryptedBuffer = combinedArray.slice(12); // The rest is encrypted data

//   // Convert secret key to a CryptoKey
//   const key = await crypto.subtle.importKey(
//     'raw',
//     new TextEncoder().encode(secretKey),
//     'AES-GCM',
//     false,
//     ['decrypt'],
//   );

//   // Decrypt the data
//   const decryptedBuffer = await crypto.subtle.decrypt(
//     { name: 'AES-GCM', iv },
//     key,
//     encryptedBuffer,
//   );

//   // Convert decrypted data back to JSON string and parse
//   const decryptedText = new TextDecoder().decode(decryptedBuffer);
//   return JSON.parse(decryptedText);
// }

export function encryptObject(obj, secretKey) {
  // Convert object to JSON string
  const jsonString = JSON.stringify(obj);

  // Generate a random 16-byte IV (Initialization Vector)
  const iv = forge.random.getBytesSync(16);

  // Derive a 16-byte key from the secretKey (AES-128)
  const key = forge.util.createBuffer(secretKey);
  key.truncate(16); // Adjust key size as needed (16 bytes for AES-128 or 32 bytes for AES-256)

  // Set up AES-CBC encryption
  const cipher = forge.cipher.createCipher('AES-CBC', key.getBytes());
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(jsonString, 'utf8'));
  cipher.finish();

  // Get the encrypted data
  const encrypted = cipher.output.getBytes();

  // Combine IV and encrypted data
  const combined = iv + encrypted;

  // Convert to Base64 for easy transport
  return forge.util.encode64(combined);
}

export function decryptObject(encryptedData, secretKey) {
  // Decode Base64 and separate IV and encrypted data
  const combined = forge.util.decode64(encryptedData);
  const iv = combined.slice(0, 16);
  const encrypted = combined.slice(16);

  // Derive the key from the secretKey
  const key = forge.util.createBuffer(secretKey);
  key.truncate(16); // Adjust key size as needed (16 bytes for AES-128 or 32 bytes for AES-256)

  // Set up AES-CBC decryption
  const decipher = forge.cipher.createDecipher('AES-CBC', key.getBytes());
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(encrypted, 'raw'));
  const success = decipher.finish();

  if (!success) throw new Error('Decryption failed');

  // Parse decrypted JSON
  return JSON.parse(decipher.output.toString('utf8'));
}

export const encryptData = async (data) => {
  const encrypt = await encryptObject(data, REACT_APP_SECRET_KEY);
  return encrypt;
};
