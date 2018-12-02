import { Header as HeaderElement } from './custom-elements/x-header';
import { YouTube as YouTubeElement } from './custom-elements/youtube-video';
import { Links as LinksElement } from './custom-elements/x-links';
import { Event as EventElement } from './custom-elements/x-event';
import { Sections as SectionsElement } from './custom-elements/x-sections';

import fetchival from 'fetchival';
import marked from 'marked'; // may want to move this to a Worker at some point

export const header_elem = document.querySelector('x-header') as HeaderElement;
export const youtube_elem = document.querySelector('youtube-video') as YouTubeElement;
export const links_elem = document.querySelector('x-links') as LinksElement;
export const sections_elem = document.querySelector('x-sections') as SectionsElement;
export const events_elem = document.querySelector('section.updates') as HTMLElement;

/**
 * Map from section/event IDs to their respective elements.
 */
export const cache = Object.seal({
  events: {} as { [key: number]: EventElement },
});

/**
 * Order of currently displayed sections/events.
 */
export const order = Object.seal({
  sections: [] as number[],
  events: [] as number[],
});

// Fetch data from API, insert into DOM

// TODO enforce requirement to have ?thread_id=xxx present
export const thread_id = /thread_id=(\d+)/.exec(location.search);
if (thread_id === null) {
  console.error('Querystring `thread_id` must be set');
} else {
  // disable lint until we get a type declaration for fetchival
  // tslint:disable-next-line no-unsafe-any
  fetchival(`http://localhost:3000/v1/thread/${thread_id[1]}?with=events`)
    .get()
    .then((thread: APIThreadData<true>) => {
      assign_header(thread);
      assign_youtube(thread);
      assign_reddit_id(thread);
      assign_sections(thread);
      assign_events(thread);
    });
}

function assign_header({ launch_name, t0 }: APIThreadData<boolean>): void {
  header_elem.launch_name = launch_name;
  header_elem.t0 = t0;
}

function assign_youtube({ youtube_id }: APIThreadData<boolean>): void {
  youtube_elem.video_id = youtube_id;
}

function assign_reddit_id({ post_id }: APIThreadData<boolean>): void {
  links_elem.reddit_id = post_id;
}

function assign_sections({ sections }: { sections: APISectionData<true>[] }): void {
  sections
    .filter(({ events }) => events.length === 0)
    .forEach(({ id, name, content }) => {
      sections_elem.add({ id, name, content });
    });
}

function assign_events({ sections }: { sections: APISectionData<true>[] }): void {
  const fragment = document.createDocumentFragment();

  sections
    .flatMap(section => section.events)
    .filter(({ posted }) => posted)
    .forEach(({ id, utc, terminal_count, message, posted }) => {
      const elem = fragment.appendChild(document.createElement('x-event')) as EventElement;
      elem.utc = utc;
      elem.terminal_count = terminal_count;
      elem.message = marked(message);
      elem.posted = posted;

      // cache so we can fetch it later, without attributes or query selectors
      cache.events[id] = elem;

      // store the order of events
      order.events.push(id);
    });

  // add to DOM
  events_elem.appendChild(fragment);
}
