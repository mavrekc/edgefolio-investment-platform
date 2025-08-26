import { buildQuery } from '../utils/api';
import { ApiError } from './errors';

const BASE = process.env.REACT_APP_API_BASE_URL;

async function request(endpoint, {
  method       = 'GET',
  params       = null,
  headers      = {},
  body         = null,
  fetchOptions = {}
} = {}) {

  const queryString = params ? buildQuery(params) : '';
  const url = `${BASE}${endpoint}${queryString}`;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...fetchOptions
  };

  if (body != null) {
    config.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch (networkErr) {
    throw new ApiError({
      message: networkErr.message || 'Network error',
      type: 'network'
    });
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    throw new ApiError({
      message: res.statusText || 'Unexpected Server Response',
      type:  'empty',
    });
  }

  if (!res.ok) {
    throw new ApiError({
      message: payload?.message || res.statusText,
      status:  res.status || payload?.status,
      type: 'status'
    });
  }

  return payload;
}

export default {
  get:     (endpoint, params, opts)   => request(endpoint, { method: 'GET',     params,      ...opts }),
  post:    (endpoint, body, opts)     => request(endpoint, { method: 'POST',    body,        ...opts }),
  put:     (endpoint, body, opts)     => request(endpoint, { method: 'PUT',     body,        ...opts }),
  patch:   (endpoint, body, opts)     => request(endpoint, { method: 'PATCH',   body,        ...opts }),
  delete:  (endpoint, params, opts)   => request(endpoint, { method: 'DELETE',  params,      ...opts }),
};
