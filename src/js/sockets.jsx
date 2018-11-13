import {
  cache,
  header_elem,
  thread_id,
  youtube_elem,
  // order,
} from './initialize.jsx';
import Sockette from 'sockette';

export const ws = new Sockette(
  'ws://localhost:3000',
  {
    onopen,
    onmessage,
    onreconnect: onopen,
  },
);

/**
 * @param {...string} rooms
 */
export function join_rooms(...rooms) {
  ws.json({ join: rooms.join(',') });
}

function onopen() {
  join_rooms(`thread_${thread_id}`);
}

function onmessage(event) {
  const { room, action, data_type, data } = JSON.parse(event);

  if (room !== `thread_${thread_id}`) {
    // we should never reach this state
    return;
  }

  if (data_type === 'thread') {
    thread_handler(action, data);
  } else if (data_type === 'section') {
    section_handler(action, data);
  } else if (data_type === 'event' ) {
    event_handler(action, data);
  }
  // other options are `user` and `preset_event`,
  // neither of which we care about here
}

function thread_handler(action, data) {
  if (action === 'delete') {
    // TODO ???
  } else if (action === 'update') {
    if (data.t0) {
      header_elem.t0 = data.t0;
    }
    if (data.youtube_id) {
      youtube_elem.id = data.youtube_id;
    }
    if (data.sections_id) {
      // TODO
    }
  }
}

function section_handler(action, data) {
  if (action === 'delete') {
    cache.sections[data.id].remove();
    delete cache.sections[data.id];
  } else if (action === 'update') {
    const section = cache.sections[data.id];

    if (data.name) {
      section.header = data.name;
    }
    if (data.content) {
      section.body = data.content;
    }
    if (data.events_id) {
      // TODO ???
      // this block may by unnecessary if `Event::utc` is required
    }
  } else if (action === 'create') {
    // TODO
  }
}

function event_handler(action, data) {
  if (action === 'delete') {
    cache.events[data.id].remove();
    delete cache.events[data.id];
  } else if (action === 'update') {
    const event = cache.events[data.id];

    if (data.message) {
      event.message = data.message;
    }
    if (data.terminal_count) {
      event.terminal_count = data.terminal_count;
    }
    if (data.utc) {
      event.utc = data.utc;
    }
    if (data.posted) {
      // TODO
    }
  } else if (action === 'create') {
    // TODO
  }
}
