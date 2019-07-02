import './polyfills';

import './custom-elements/Header';
import './custom-elements/Video';
import './custom-elements/Twitter';
import './custom-elements/Sections';
import './custom-elements/Events';
import './custom-elements/Links';

import './custom-elements/modals/InitModal';

import './initialize';
import './sockets';
import './socket-handler';

export function is_host() {
  return new URL(window.location.href).searchParams.has('host');
}

if (is_host()) {
  import('./index-host');
}
