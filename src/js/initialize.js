import {
  header_elem,
  youtube_elem,
  links_elem,
  events_elem,
  sections_elem,
  init_modal_elem,
} from './elements.js';
import esfetch from 'https://unsafe-production.jspm.io/npm:esfetch@0.1.2/index.js';
import { init_socket } from './sockets.js';
/* inline */ import vars from './helpers/variable-declarations.json';

export function get_thread_data(id: string | number) {
  return esfetch(`${vars.server_url}/v1/thread/${id}/full?features=space,spacex`).get();
}

export async function initialize({
  id,
  display_name,
  space__t0,
  youtube_id,
  post_id,
  sections,
  events,
}) {
  const promises = [];

  // Assign sections data
  sections
    .filter(({ is_events_section }) => !is_events_section)
    .forEach(data => sections_elem.add(data, false));
  sections_elem.requestUpdate() |> promises.push;

  // Assign events data
  events.forEach(data => events_elem.add(data, false));
  events_elem.requestUpdate() |> promises.push;

  // Assign YouTube data
  youtube_elem().youtube_id = youtube_id;
  youtube_elem().requestUpdate() |> promises.push;

  // Assign header data
  header_elem.display_name = display_name;
  header_elem.space__t0 = space__t0;
  header_elem.requestUpdate() |> promises.push;

  // Assign links data
  links_elem.post_id = post_id;
  links_elem.requestUpdate() |> promises.push;

  await Promise.all(promises);
  return id;
}

const thread_id = new URL(window.location.href).searchParams.get('thread_id');
if (thread_id !== null) {
  get_thread_data(thread_id)
    .then(initialize)
    .then(init_socket)
    .then(() => init_modal_elem.remove());
}
