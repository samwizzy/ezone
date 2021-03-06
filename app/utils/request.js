/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
import history from './history'

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log(response, "response")
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    history.push('/logout')
  }

  const error = new Error(response.statusText);
  error.response = response
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  console.log(url, options, 'url, options');
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}
