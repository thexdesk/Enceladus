import { events_elem, header_elem, links_elem, sections_elem, video_elem } from './elements';
import { socket_events as socket } from './sockets';

// In lieu of Babel support for object pick notation (and assignment),
// use this helper to extract properties to a given name/alias.
// This also removes undefined values,
// which is something pick may or may not do.
function extract(object, props) {
  return Object.fromEntries(
    Object
      .entries(props)
      .filter(([key]) => object[key] !== undefined)
  );
}

socket.on('thread:update', data => {
  Object.assign(header_elem, extract(data, { display_name: 'display_name', space__t0: 't0' }));
  Object.assign(links_elem, extract(data, { post_id: 'post_id' }));
  Object.assign(video_elem, extract(data, { video_id: 'video_id' }));
  Object.assign(sections_elem, extract(data, { sections_id: 'id' }));
});

socket.on('section:delete', ({ id }) => sections_elem.delete(id));
socket.on('section:update', sections_elem.modify);
socket.on('section:create', sections_elem.add);

socket.on('event:delete', ({ id }) => events_elem.delete(id));
socket.on('event:update', events_elem.modify);
socket.on('event:create', events_elem.add);
