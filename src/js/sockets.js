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
    // we should never reach this state
    return;
  }

  data.action = action;

  switch (data_type) {
    case 'thread': thread_handler(data); break;
    case 'section': section_handler(data); break;
    case 'event': event_handler(data); break;
  }
}

function thread_handler({
  action,
  display_name,
  space__t0,
  post_id,
  youtube_id,
  sections_id,
}) {
  if (action === 'update') {
    header_elem |> assign_defined(#, { display_name, space__t0 });
    links_elem |> assign_defined(#, { post_id });
    youtube_elem |> assign_defined(#, { youtube_id });
    sections_elem |> assign_defined(#, { ids: sections_id });
  }
}

function section_handler() {
  switch (data.action) {
    case 'delete': sections_elem.delete(data.id); break;
    case 'update': sections_elem.modify(data); break;
    case 'create': sections_elem.add(data); break;
  }
}

function event_handler(data) {
  switch (data.action) {
    case 'delete': events_elem.delete(data.id); break;
    case 'update': events_elem.modify(data); break;
    case 'create': events_elem.add(data); break;
  }
}
