/* inline */ import vars from './helpers/variable-declarations.json';

export const api_jwt = localStorage.getItem('api_jwt');
export const username = localStorage.getItem('username');
export const user_id = localStorage.getItem('user_id');
export const lang = localStorage.getItem('lang');

const url = new URL(window.location.href);
const params = {
  token: url.searchParams.get('token'),
  username: url.searchParams.get('username'),
  user_id: url.searchParams.get('user_id'),
  lang: url.searchParams.get('lang'),
};

if (![params.token, params.username, params.user_id, params.lang].includes(null)) {
  localStorage.setItem('api_jwt', params.token);
  localStorage.setItem('username', params.username);
  localStorage.setItem('user_id', params.username);
  localStorage.setItem('lang', params.lang);

  // Remove the returned parameters from the URL.
  Object.keys(params).forEach(param => url.searchParams.delete(param));
  window.history.replaceState(undefined, '', url.href);
} else if ([api_jwt, username, lang].includes(null)) {
  window.location.assign(
    `${vars.server_url}/oauth?callback=${window.location.href}`,
  );
}
