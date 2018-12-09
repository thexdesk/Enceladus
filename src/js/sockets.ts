import { events_elem, header_elem, links_elem, sections_elem, youtube_elem } from './elements';
import Sockette from 'sockette';
import { assign_defined } from '@jhpratt/assign-defined';

let ws: Nullable<Sockette> = null;
export function init_socket(thread_id: number): void {
  ws = new Sockette('ws://localhost:3000', {
    onopen: onopen.bind({ thread_id }) as () => void,
    onmessage: onmessage.bind({ thread_id }) as (event: MessageEvent) => void,
    onreconnect: onopen.bind({ thread_id }) as () => void,
  });
}

export function join_rooms(...rooms: string[]): void {
  if (ws !== null) {
    ws.json({ join: rooms.join(',') });
  }
}

function onopen(this: { thread_id: number }): void {
  join_rooms(`thread_${this.thread_id}`);
}

function onmessage(this: { thread_id: number }, event: MessageEvent): void {
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
    return;
  }

  data.action = action;

  if (data_type === 'thread') {
    thread_handler(data as APIData<APIThreadData>);
  } else if (data_type === 'section') {
    section_handler(data as APIData<APISectionData>);
  } else if (data_type === 'event') {
    event_handler(data as APIData<APIEventData>);
  }
}

function thread_handler({
  action,
  launch_name,
  t0,
  post_id: reddit_id,
  youtube_id: video_id,
  sections_id: ids,
}: APIData<APIThreadData>): void {
  if (action === 'update') {
    assign_defined(header_elem, { launch_name, t0 });
    assign_defined(links_elem, { reddit_id });
    assign_defined(youtube_elem, { video_id });
    assign_defined(sections_elem, { ids });
  }
}

function section_handler(data: APIData<APISectionData>): Promise<unknown> | void {
  if (data.action === 'delete') {
    return sections_elem.delete(data.id);
  } else if (data.action === 'update') {
    return sections_elem.modify(data);
  } else if (data.action === 'create') {
    return sections_elem.add(data);
  }
}

function event_handler(data: APIData<APIEventData>): Promise<unknown> | void {
  if (data.action === 'delete') {
    return events_elem.delete(data.id);
  } else if (data.action === 'update') {
    return events_elem.modify(data);
  } else if (data.action === 'create') {
    return events_elem.add(data);
  }
}
