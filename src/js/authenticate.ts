export let api_jwt = localStorage.getItem('api_jwt');
export let username = localStorage.getItem('username');
export let lang = localStorage.getItem('lang');

const url = new URL(window.location.href);
const params = {
  token: url.searchParams.get('token'),
  username: url.searchParams.get('username'),
  lang: url.searchParams.get('lang'),
};

if (![params.token, params.username, params.lang].includes(null)) {
  localStorage.setItem('api_jwt', params.token!);
  localStorage.setItem('username', params.username!);
  localStorage.setItem('lang', params.lang!);

  // remove the returned parameters from the URL
  // tslint:disable-next-line newline-per-chained-call
  Object.keys(params).forEach(param => url.searchParams.delete(param));
  window.history.replaceState(undefined, '', url.href);
} else if ([api_jwt, username, lang].includes(null)) {
  window.location.assign(
    `http://localhost:3000/oauth?callback=${encodeURIComponent(window.location.href)}`,
  );
}
