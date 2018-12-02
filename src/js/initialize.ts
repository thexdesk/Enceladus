import { Header as HeaderElement } from './custom-elements/x-header';
import { YouTube as YouTubeElement } from './custom-elements/youtube-video';
import { Links as LinksElement } from './custom-elements/x-links';
import { Events as EventsElement } from './custom-elements/x-events';
import { Sections as SectionsElement } from './custom-elements/x-sections';

import fetchival from 'fetchival';

export const header_elem = document.querySelector<HeaderElement>('x-header')!;
export const youtube_elem = document.querySelector<YouTubeElement>('youtube-video')!;
export const links_elem = document.querySelector<LinksElement>('x-links')!;
export const sections_elem = document.querySelector<SectionsElement>('x-sections')!;
export const events_elem = document.querySelector<EventsElement>('x-events')!;

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

function assign_sections({ sections }: APIThreadData<true>): void {
  sections
    .filter(({ events }) => events.length === 0)
    .forEach(data => sections_elem.add(data, false));
  sections_elem.requestUpdate(); // tslint:disable-line no-floating-promises
}

function assign_events({ sections }: APIThreadData<true>): void {
  const events_section = sections.find(section => section.events.length !== 0);
  if (events_section === undefined) {
    return;
  }

  events_section.events.forEach(data => events_elem.add(data, false));
  events_elem.requestUpdate(); // tslint:disable-line no-floating-promises
}
