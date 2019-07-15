import {
  header_elem,
  video_elem,
  links_elem,
  events_elem,
  sections_elem,
  init_modal_elem,
} from './elements';
import esfetch from 'esfetch';
import { init_socket } from './sockets';
import { server_url } from './variable-declarations';

/**
 * @param {number} id
 */
export function get_thread_data(id) {
  return esfetch(`${server_url}/v1/thread/${id}/full?features=space,spacex`).get();
}

/**
 * @returns {number}
 */
export function initialize({
  id,
  display_name,
  space__t0,
  video_url,
  post_id,
  sections = [],
  events = [],
}) {
  // Assign sections data
  sections
    .filter(({ is_events_section }) => !is_events_section)
    .forEach(data => sections_elem.add(data, false));

  // Assign events data
  events.forEach(data => events_elem.add(data, false));

  // Assign YouTube data
  video_elem.video_url = video_url;

  // Assign header data
  header_elem.display_name = display_name;
  header_elem.t0 = space__t0;

  // Assign links data
  links_elem.post_id = post_id;

  return id;
}

const thread_id = new URL(window.location.href).searchParams.get('thread_id');
if (thread_id !== null) {
  get_thread_data(thread_id)
    .then(initialize)
    .then(init_socket)
    .then(() => init_modal_elem.remove());
}
