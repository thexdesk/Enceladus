import EventEmitter from './EventEmitter';
import Sockette from 'sockette';
import { ws_url } from './variable-declarations';

export const socket_events = new EventEmitter();

let ws = null;
export function init_socket(thread_id) {
  ws = new Sockette(ws_url, {
    onopen() {
      onopen(thread_id);
    },
    onmessage(message) {
      onmessage(thread_id, message);
    },
    onreconnect() {
      onopen(thread_id);
    },
  });
}

export function join_rooms(...rooms) {
  ws?.join({ join: rooms.join(',') });
}

function onopen(thread_id) {
  join_rooms(`thread_${thread_id}`);
}

function onmessage(thread_id, message) {
  const {
    room,
    action,
    data_type,
    data,
  } = JSON.parse(message.data);

  if (room !== `thread_${thread_id}`) {
    // We should never reach this state.
    return;
  }

  socket_events.emit(`${data_type}:${action}`, data);
}

