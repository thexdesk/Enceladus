import './custom-elements/x-countdown.js';
import './custom-elements/x-header.js';
import './custom-elements/youtube-video.js';
import './custom-elements/x-twitter.js';
import './custom-elements/x-sections.js';
import './custom-elements/x-events.js';
import './custom-elements/x-links.js';

import './custom-elements/modals/init-modal.js';

import './initialize.js';
import './sockets.js';

export function is_host() {
  return new URL(window.location.href).searchParams.has('host');
}

if (is_host()) {
  import('./custom-elements/modals/youtube-modal.js');
  import('./initialize-host.js').then(() => {
    document.querySelector('youtube-modal').hidden = false;
  });
}
