const header_elem = document.querySelector('x-header');
const youtube_elem = document.querySelector('youtube-video');
const links_elem = document.querySelector('x-links');
const sections_elem = document.querySelector('x-sections');
const events_elem = document.querySelector('x-events');
const init_modal_elem = document.querySelector('init-modal');

// We need to lazily get this,
// as it's appended by a script and not present by default.
// Doing this avoids a potential race condition.
let _youtube_modal = null;
function youtube_modal() {
  if (_youtube_modal === null) {
    _youtube_modal = document.querySelector('youtube-modal');
  }
  return _youtube_modal;
}

export {
  header_elem,
  youtube_elem,
  links_elem,
  sections_elem,
  events_elem,
  init_modal_elem,
  youtube_modal,
};
