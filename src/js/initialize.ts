import { Header, YouTube, Links, Events, Sections } from './custom-elements';
import fetchival from 'fetchival';

navigator.serviceWorker.register('sw.js'); // tslint:disable-line no-floating-promises

export const header_elem = document.querySelector<Header>('x-header')!;
export const youtube_elem = document.querySelector<YouTube>('youtube-video')!;
export const links_elem = document.querySelector<Links>('x-links')!;
export const sections_elem = document.querySelector<Sections>('x-sections')!;
export const events_elem = document.querySelector<Events>('x-events')!;

// TODO show user error if ?thread_id=xxx is not present
export const thread_id = /thread_id=(\d+)/.exec(location.search);
if (thread_id === null) {
  throw new Error('Querystring `thread_id` must be set');
}

// disable lint until we get a type declaration for fetchival
// tslint:disable-next-line no-unsafe-any
fetchival(`http://localhost:3000/v1/thread/${thread_id[1]}?with=events`)
  .get()
  .then(({ launch_name, t0, youtube_id, post_id, sections }: APIThreadData<true>) => {
    // assign header data
    header_elem.launch_name = launch_name;
    header_elem.t0 = t0;

    // assign YouTube data
    youtube_elem.video_id = youtube_id;

    // assign links data
    links_elem.reddit_id = post_id;

    // assign sections data
    sections
      .filter(({ events }) => events.length === 0)
      .forEach(data => sections_elem.add(data, false));
    sections_elem.requestUpdate(); // tslint:disable-line no-floating-promises

    // assign events data
    const events_section = sections.find(section => section.events.length !== 0);
    if (events_section === undefined) { return; }
    events_section.events.forEach(data => events_elem.add(data, false));
    events_elem.requestUpdate(); // tslint:disable-line no-floating-promises
  });
