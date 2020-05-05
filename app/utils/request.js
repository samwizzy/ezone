import * as AppActions from '../containers/App/actions';
import store from '../configureStore';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
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
  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }else if(response.status >= 401 && response.status < 408){
  //   console.log(response.status, 'response.status');
  //   console.log("We got a 401 status error y'all")
  //   store.dispatch(AppActions.refreshToken())
  //   // store.dispatch(AppActions.logout())
  //   return
  // }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // if (response.status === 401) {
  //   console.log(response.status, 'response.status');
  //   console.log("We got a 401 status error y'all");
  //   return store.dispatch(AppActions.refreshToken());
  // }

  const error = new Error(response.statusText);
  error.response = response;
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
  // console.log(url, options, 'url, options');
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
