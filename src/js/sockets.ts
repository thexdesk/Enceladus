import { events_elem, header_elem, links_elem, sections_elem, youtube_elem } from './elements';
import Sockette from 'sockette';
import { assign_defined } from '@jhpratt/assign-defined';
import { ws_url } from './helpers/variable-declarations';

let ws: Nullable<Sockette> = null;
export function init_socket(thread_id: number) {
  ws = new Sockette(ws_url, {
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

function onopen(this: { thread_id: number }) {
  join_rooms(`thread_${this.thread_id}`);
}

function onmessage(this: { thread_id: number }, event: MessageEvent) {
  const {
    room,
    action,
    data_type,
    data,
  }: {
    room: string;
    action: 'create' | 'update' | 'delete';
    data_type: 'thread' | 'section' | 'event';
    data: APIData;
  } = JSON.parse(event.data); // tslint:disable-line no-unsafe-any

  if (room !== `thread_${this.thread_id}`) {
    // we should never reach this state
    return Promise.resolve();
  }

  data.action = action;

  if (data_type === 'thread') {
    thread_handler(data as APIData<APIThread>);
  } else if (data_type === 'section') {
    return section_handler(data as APIData<APISection>);
  } else if (data_type === 'event') {
    return event_handler(data as APIData<APIEvent>);
  }
  return Promise.resolve();
}

function thread_handler({
  action,
  display_name,
  space__t0,
  post_id,
  youtube_id,
  sections_id,
}: APIData<APIThread>): void {
  if (action === 'update') {
    assign_defined(header_elem, { display_name, space__t0 });
    assign_defined(links_elem, { post_id });
    assign_defined(youtube_elem, { youtube_id });
    assign_defined(sections_elem, { ids: sections_id });
  }
}

function section_handler(data: APIData<APISection>) {
  if (data.action === 'delete') {
    return sections_elem.delete(data.id);
  } else if (data.action === 'update') {
    return sections_elem.modify(data);
  } /* data.action === 'create' */ else {
    return sections_elem.add(data);
  }
}

function event_handler(data: APIData<APIEvent>) {
  if (data.action === 'delete') {
    return events_elem.delete(data.id);
  } else if (data.action === 'update') {
    return events_elem.modify(data);
  } /* data.action === 'create' */ else {
    return events_elem.add(data);
  }
}
