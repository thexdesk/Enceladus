const header_elem = document.querySelector('x-header');
const video_elem = document.querySelector('x-video');
const links_elem = document.querySelector('x-links');
const sections_elem = document.querySelector('x-sections');
const events_elem = document.querySelector('x-events');
const init_modal_elem = document.querySelector('init-modal');

// We need to lazily get this,
// as it's appended by a script and not present by default.
// Doing this avoids a potential race condition.
let _video_modal = Object.create(null);
const video_modal = new Proxy(_video_modal, {
  get(obj, prop) {
    if (Object.keys(obj).length === 0) {
      _video_modal = document.querySelector('video-modal');
      obj = _video_modal; // eslint-disable-line no-param-reassign
    }
    return obj?.[prop];
  },
  set(obj, prop, value) {
    if (Object.keys(obj).length === 0) {
      _video_modal = document.querySelector('video-modal');
      obj = _video_modal; // eslint-disable-line no-param-reassign
      if (_video_modal === null) {
        return false;
      }
    }
    return Reflect.set(obj, prop, value);
  },
});

export {
  header_elem,
  video_elem,
  links_elem,
  sections_elem,
  events_elem,
  init_modal_elem,
  video_modal,
};
