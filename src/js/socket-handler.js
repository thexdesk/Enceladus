import { events_elem, header_elem, links_elem, sections_elem, video_elem } from './elements';
import { socket_events as socket } from './sockets';

socket.on('thread:update', data => {
  if (data.display_name !== undefined) {
    header_elem.display_name = data.display_name;
  }

  if (data.space__t0 !== undefined) {
    header_elem.t0 = data.space__t0;
  }

  if (data.post_id !== undefined) {
    links_elem.post_id = data.post_id;
  }

  if (data.video_id !== undefined) {
    video_elem.video_id = data.video_id;
  }

  if (data.sections_id !== undefined) {
    sections_elem.ids = data.sections_id;
  }
});

socket.on('section:delete', ({ id }) => sections_elem.delete(id));
socket.on('section:update', sections_elem.modify);
socket.on('section:create', sections_elem.add);

socket.on('event:delete', ({ id }) => events_elem.delete(id));
socket.on('event:update', events_elem.modify);
socket.on('event:create', events_elem.add);
