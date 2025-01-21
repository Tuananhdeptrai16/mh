import  { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const FETCH_STATUS = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  DISABLED: 'DISABLED',
};

const defaultAxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const generateKeySaveCache = (url, options = {}) => {
  return `${url}-${JSON.stringify(options)}`;
};

/**1
 * Custom hook for fetching data with optional caching and configurations.
 *
 * @param {Object} config - The configuration for the fetch request.
 * @param {Object} config.instance - Axios instance to use for the request. Defaults to `defaultAxiosInstance`.
 * @param {string} config.url - The URL to fetch data from.
 * @param {string} config.method - HTTP method (GET, POST, etc.). Defaults to 'GET'.
 * @param {Object} config.body - The request body for POST/PUT requests.
 * @param {Object} config.params - Query parameters for the request.
 * @param {Object} config.headers - Custom headers for the request.
 * @param {boolean} config.loadInit - Whether to fetch data on initialization. Defaults to `true`.
 * @param {boolean} config.useCache - Whether to use caching for the request. Defaults to `false`.
 * @param {number} config.timeCache - Cache duration in milliseconds. Defaults to 180000 (3 minutes).
 * @param {boolean} config.enabled - Whether the fetch is enabled. Defaults to `true`.
 * @param {Array} deps - Dependency array to re-trigger fetch.
 * @return {Object} - Contains `status`, `error`, `data`, `isLoading`, and `fetchData` function.
 */
const useFetch = (config, deps = []) => {
  const {
    instance = defaultAxiosInstance,
    url,
    method = 'GET',
    body,
    params,
    headers = {},
    loadInit = true,
    useCache = false,
    timeCache = 180000,
    enabled = true,
    ...attrs
  } = config || {};

  const refMount = useRef(false);
  const refIndex = useRef(0);
  const [status, setStatus] = useState(FETCH_STATUS.INIT);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cache = useRef(new Map());

  const fetchData = (force = false) => {
    if (!url) {
      setData(null);
      setStatus(FETCH_STATUS.SUCCESS);
      return;
    }

    refIndex.current++;
    const currentIndex = refIndex.current;
    setStatus(FETCH_STATUS.LOADING);
    setError(null);

    const cacheKey = generateKeySaveCache(url, { method, params, body });
    if (useCache && !force) {
      const cached = cache.current.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < timeCache) {
        setData(cached.data);
        setStatus(FETCH_STATUS.SUCCESS);
        return;
      }
    }

    instance({
      method,
      url,
      data: body,
      params,
      headers,
      ...attrs,
    })
      .then((response) => {
        if (currentIndex === refIndex.current) {
          if (response.status >= 400) {
            setError(response.statusText || 'An error occurred');
            setStatus(FETCH_STATUS.ERROR);
          } else {
            const responseData = response.data;
            if (useCache) {
              cache.current.set(cacheKey, { data: responseData, timestamp: Date.now() });
            }
            setData(responseData);
            setStatus(FETCH_STATUS.SUCCESS);
          }
        }
      })
      .catch((err) => {
        if (currentIndex === refIndex.current) {
          setStatus(FETCH_STATUS.ERROR);
          setError(err?.response?.data?.message || err.message || 'Unknown error');
        }
      });
  };

  useEffect(() => {
    if (!enabled) {
      setStatus(FETCH_STATUS.DISABLED);
      return;
    }

    if (loadInit || refMount.current) {
      fetchData();
    }

    refMount.current = true;

    // Cleanup cache based on timeCache
    const cleanupCache = setInterval(() => {
      const now = Date.now();
      for (const [key, { timestamp }] of cache.current.entries()) {
        if (now - timestamp > timeCache) {
          cache.current.delete(key);
        }
      }
    }, timeCache);

    return () => clearInterval(cleanupCache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return {
    status,
    error,
    data,
    isLoading: status === FETCH_STATUS.INIT || status === FETCH_STATUS.LOADING,
    fetchData,
  };
};

export default useFetch;
