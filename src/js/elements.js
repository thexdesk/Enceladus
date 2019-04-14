const header_elem = document.querySelector('x-header');
const youtube_elem = document.querySelector('youtube-video');
const links_elem = document.querySelector('x-links');
const sections_elem = document.querySelector('x-sections');
const events_elem = document.querySelector('x-events');
const init_modal_elem = document.querySelector('init-modal');

// We need to lazily get this,
// as it's appended by a script and not present by default.
// Doing this avoids a potential race condition.
let _youtube_modal = Object.create(null);
const youtube_modal = new Proxy(_youtube_modal, {
  get(obj, prop) {
    if (Object.keys(obj).length === 0) {
      _youtube_modal = document.querySelector('youtube-modal');
      obj = _youtube_modal; // eslint-disable-line no-param-reassign
    }
    return obj?.[prop];
  },
  set(obj, prop, value) {
    if (Object.keys(obj).length === 0) {
      _youtube_modal = document.querySelector('youtube-modal');
      obj = _youtube_modal; // eslint-disable-line no-param-reassign
      if (_youtube_modal === null) {
        return false;
      }
    }
    return Reflect.set(obj, prop, value);
  },
});

export {
  header_elem,
  youtube_elem,
  links_elem,
  sections_elem,
  events_elem,
  init_modal_elem,
  youtube_modal,
};
