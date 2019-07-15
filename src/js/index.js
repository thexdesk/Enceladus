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

import { is_host } from './helpers';

if (is_host()) {
  import('./index-host');
}
