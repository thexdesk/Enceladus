import {
  events_elem,
  header_elem,
  links_elem,
  sections_elem,
  thread_id,
  youtube_elem,
} from './initialize';
import Sockette from 'sockette';

export const ws = new Sockette('ws://localhost:3000', {
  onopen,
  onmessage,
  onreconnect: onopen,
});

export function join_rooms(...rooms: string[]): void {
  ws.json({ join: rooms.join(',') });
}

function onopen(): void {
  join_rooms(`thread_${thread_id}`);
}

function onmessage(event: MessageEvent): void {
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

  if (room !== `thread_${thread_id}`) {
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
