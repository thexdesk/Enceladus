import {
  header_elem,
  youtube_elem,
  links_elem,
  events_elem,
  sections_elem,
  init_modal_elem,
} from './elements';
import esfetch from 'esfetch';
import { init_socket } from './sockets';
import { server_url } from './helpers/variable-declarations';

export function get_thread_data(id: string | number): Promise<APIFullThread> {
  // tslint:disable-next-line newline-per-chained-call
  return esfetch(`${server_url}/v1/thread/${id}/full`).get();
}

export async function initialize({
  id,
  display_name,
  space__t0,
  youtube_id,
  post_id,
  sections,
  events,
}: APIFullThread): Promise<number> {
  const promises: Promise<unknown>[] = [];

  // assign header data
  header_elem.display_name = display_name;
  header_elem.space__t0 = space__t0;

  // assign YouTube data
  youtube_elem.youtube_id = youtube_id;

  // assign links data
  links_elem.post_id = post_id;

  // assign sections data
  sections
    .filter(({ is_events_section }) => !is_events_section)
    .forEach(data => sections_elem.add(data, false));
  promises.push(sections_elem.requestUpdate());

  // assign events data
  events.forEach(data => events_elem.add(data, false));
  promises.push(events_elem.requestUpdate());

  await Promise.all(promises);
  return id;
}

const thread_id = new URL(window.location.href).searchParams.get('thread_id');
if (thread_id !== null) {
  // tslint:disable-next-line no-floating-promises
  get_thread_data(thread_id)
    .then(initialize)
    .then(init_socket)
    .then(() => init_modal_elem.remove());
}
