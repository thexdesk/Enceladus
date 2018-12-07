import {
  events_elem,
  header_elem,
  links_elem,
  sections_elem,
  youtube_elem,
} from './elements';
import Sockette from 'sockette';

let ws: Nullable<Sockette> = null;
export function init_socket(thread_id: number): Promise<unknown> {
  ws = new Sockette('ws://localhost:3000', {
    onopen: onopen.bind({ thread_id }) as () => void,
    onmessage: onmessage.bind({ thread_id }) as (event: MessageEvent) => void,
    onreconnect: onopen.bind({ thread_id }) as () => void,
  });
  return Promise.resolve();
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

function thread_handler(data: APIData<APIThreadData>): void {
  if (data.action === 'update') {
    if (data.launch_name !== undefined) {
      header_elem.launch_name = data.launch_name;
    }
    if (data.post_id !== undefined) {
      links_elem.reddit_id = data.post_id;
    }
    if (data.t0 !== undefined) {
      header_elem.t0 = data.t0;
    }
    if (data.youtube_id !== undefined) {
      youtube_elem.video_id = data.youtube_id;
    }
    if (data.sections_id !== undefined) {
      sections_elem.ids = data.sections_id;
    }
  }
  // TODO what if `data.action === 'delete'`?
}

function section_handler(data: APIData<APISectionData>): void {
  if (data.action === 'delete') {
    sections_elem.delete(data.id);
  } else if (data.action === 'update') {
    sections_elem.modify(data);
  } else if (data.action === 'create') {
    sections_elem.add(data);
  }
}

function event_handler(data: APIData<APIEventData>): void {
  if (data.action === 'delete') {
    events_elem.delete(data.id);
  } else if (data.action === 'update') {
    events_elem.modify(data);
  } else if (data.action === 'create') {
    events_elem.add(data);
  }
}
