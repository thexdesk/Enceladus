import { events_elem, header_elem, links_elem, sections_elem, youtube_elem } from './elements.js';
import Sockette from 'https://unsafe-production.jspm.io/sockette@2.0.5';
import {
  assign_defined,
} from 'https://unsafe-production.jspm.io/npm:@jhpratt/assign-defined@0.1.0/index.js';
/* inline */ import vars from './helpers/variable-declarations.json';

let ws = null;
export function init_socket(thread_id: number) {
  ws = new Sockette(vars.ws_url, {
    onopen: onopen.bind({ thread_id }),
    onmessage: onmessage.bind({ thread_id }),
    onreconnect: onopen.bind({ thread_id }),
  });
}

export function join_rooms(...rooms: string[]) {
  if (ws !== null) {
    ws.json({ join: rooms.join(',') });
  }
}

function onopen() {
  join_rooms(`thread_${this.thread_id}`);
}

function onmessage(event: MessageEvent) {
  const {
    room,
    action,
    data_type,
    data,
  } = JSON.parse(event.data);

  if (room !== `thread_${this.thread_id}`) {
    // We should never reach this state.
    return;
  }

  data.action = action;

  [`${data_type}_handler`](data);
}

// eslint-disable-next-line no-unused-vars
function thread_handler({
  action,
  display_name,
  space__t0,
  post_id,
  youtube_id,
  sections_id,
}) {
  // FIXME Use the pipeline operator for readability once babel/babel-eslint#765 is resolved.
  if (action === 'update') {
    assign_defined(header_elem, { display_name, space__t0 });
    assign_defined(links_elem, { post_id });
    assign_defined(youtube_elem(), { youtube_id });
    assign_defined(sections_elem, { ids: sections_id });
  }
}

// eslint-disable-next-line no-unused-vars
function section_handler(data) {
  /* eslint-disable max-statements-per-line */
  switch (data.action) {
    case 'delete': sections_elem.delete(data.id); break;
    case 'update': sections_elem.modify(data); break;
    case 'create': sections_elem.add(data); break;
  }
  /* eslint-enable max-statements-per-line */
}

// eslint-disable-next-line no-unused-vars
function event_handler(data) {
  /* eslint-disable max-statements-per-line */
  switch (data.action) {
    case 'delete': events_elem.delete(data.id); break;
    case 'update': events_elem.modify(data); break;
    case 'create': events_elem.add(data); break;
  }
  /* eslint-enable max-statements-per-line */
}
