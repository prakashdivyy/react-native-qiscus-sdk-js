// @flow
/* global Headers */

// import SERVER_API from '../constants/defaultServerAPIUrl';

type Fetch = typeof global.fetch;
type FetchReturn = {
  data?: Object;
  result: string;
  message: Object | string | Array<Object>;
};

let customFetch: ?Fetch;

export function setFetch(newFetch: Fetch) {
  let previousFetch = customFetch;
  customFetch = newFetch;
  let restorePrevious = () => {
    customFetch = previousFetch;
  };
  return restorePrevious;
}

export default async function fetchJSON(url: string, options: Object = {}, customAPI?: string): Promise<FetchReturn> {
  let fetch = customFetch || global.fetch;
  if (customFetch == null) {
    let response = customAPI ?
      await fetch(`${customAPI}${url}`, {...options}) :
      await fetch(`${url}`, {...options});
    let contentTypeRaw = response.headers.get('Content-Type') || '';
    let contentType = contentTypeRaw.split(';')[0].toLowerCase().trim();
    let body = await response.json();
    let errorMessage;
    if (!response.ok) {
      errorMessage = `Unexpected response status: ${response.status}`;
    } else if (contentType !== 'application/json') {
      errorMessage = `Unexpected response type: ${contentType}`;
    }
    if (errorMessage != null) {
      let error: Object = new Error(errorMessage);
      Object.assign(error, {
        status: response.status,
        headers: toObject(response.headers),
        body,
      });
      throw error;
    }
    return body;
  } else {
    let response = customAPI ?
      await fetch(`${customAPI}${url}`, {...options}) :
      await fetch(`${url}`, {...options});
    return response;
  }
}

function toObject(headers: Headers) {
  let result: {[key: string]: mixed} = {};
  if (headers.forEach) {
    headers.forEach((value, key) => {
      result[key] = value;
    });
  } else {
    for (let [key, value] of headers.entries()) {
      result[key] = value;
    }
  }
  return result;
}
