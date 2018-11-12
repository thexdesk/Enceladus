import createElement from './createElement';
import fetchival from 'fetchival';

const header_elem = document.querySelector('x-header');
const youtube_elem = document.querySelector('youtube-video');
const links_elem = document.querySelector('x-links');
const sections_elem = document.querySelector('section.sections');
const events_elem = document.querySelector('section.updates');

/**
 * Map from section/event IDs to their respective elements.
 *
 * @typedef {{ [key: number]: HTMLElement }} NumberToHTMLElement
 * @type {{ sections: NumberToHTMLElement, events: NumberToHTMLElement }}
 */
export const cache = {
  sections: {},
  events: {},
};

/**
 * Order of currently displayed sections/events.
 *
 * @type {{ sections: number[], events: number[] }}
 */
export const order = {
  sections: [],
  events: [],
};

// Fetch data from API, insert into DOM

// TODO enforce requirement to have ?thread_id=xxx present
const [, thread_id] = /thread_id=(\d*)/.exec(location.search);
fetchival(`http://localhost:3000/v1/thread/${thread_id}?with=events`)
  .get()
  .then(thread => {
    assign_header(thread);
    assign_youtube(thread);
    assign_reddit_id(thread);
    assign_sections(thread);
    assign_events(thread);
  });


function assign_header({ launch_name, t0 }) {
  header_elem.launch_name = launch_name;
  header_elem.t0 = t0;
}

function assign_youtube({ youtube_id }) {
  youtube_elem.id = youtube_id;
}

function assign_reddit_id({ post_id }) {
  links_elem.reddit_id = post_id;
}

function assign_sections({ sections }) {
  const fragment = <></>;

  // create x-section elements for all sections without events
  sections
    .filter(({ events }) => events.length === 0)
    .forEach(({ id, name, content }) => {
      const elem = fragment.appendChild(<x-section/>);
      elem.header = name;
      elem.body = content;

      // cache so we can fetch it later without attributes and query selectors
      cache.sections[id] = elem;

      // store the order of visible sections
      order.sections.push(id);
    });

  // add to DOM
  sections_elem.appendChild(fragment);
}

function assign_events({ sections }) {
  const fragment = <></>;

  sections
    .flatMap(section => section.events)
    .filter(({ posted }) => posted)
    .forEach(({ id, utc, terminal_count, message }) => {
      const elem = fragment.appendChild(<x-event/>);
      elem.utc = utc;
      elem.terminal_count = terminal_count;
      elem.message = message;

      // cache so we can fetch it later, without attributes or query selectors
      cache.events[id] = elem;

      // store the order of events
      order.events.push(id);
    });

  // add to DOM
  events_elem.appendChild(fragment);
}
