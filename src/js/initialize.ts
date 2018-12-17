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

if (window.isSecureContext) {
  navigator.serviceWorker.register('sw.js'); // tslint:disable-line no-floating-promises
}

export function get_thread_data(id: string | number): Promise<APIThreadData<true>> {
  // tslint:disable-next-line newline-per-chained-call
  return esfetch(`${server_url}/v1/thread/${id}?with=events`).get();
}

export async function initialize({
  id,
  launch_name,
  t0 = null,
  youtube_id = null,
  post_id = null,
  sections = [],
}: APIThreadData<true>): Promise<number> {
  const promises: Promise<unknown>[] = [];

  // assign header data
  header_elem.launch_name = launch_name;
  header_elem.t0 = t0;

  // assign YouTube data
  youtube_elem.video_id = youtube_id;

  // assign links data
  links_elem.reddit_id = post_id;

  // assign sections data
  sections
    .filter(({ events: { length }}) => length === 0)
    .forEach(data => sections_elem.add(data, false));
  promises.push(sections_elem.requestUpdate());

  // assign events data
  const events_section = sections.find(({ events: { length }}) => length !== 0);
  if (events_section !== undefined) {
    events_section.events.forEach(data => events_elem.add(data, false));
    promises.push(events_elem.requestUpdate());
  }

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
