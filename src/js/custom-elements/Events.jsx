import styles from 'css/components/Events';
import { Event } from './Event';
import { mutate } from 'js/rearrange-elements';

@Attr('role', 'table region')
@Attr('aria-live', 'polite')
export class Events extends CustomElement {
  // Sorted array of IDs, to be used as a key for `this.#events`.
  #ids = [];

  // Map of IDs to `Event` objects. All objects must be present on the DOM.
  #events = Object.create(null);

  // Reference to the events section.
  #events_elem;

  static html = <>
    <style>{styles}</style>

    <h1>LIVE UPDATES</h1>

    <table>
      <tr>
        <th>Time</th>
        <th>Count</th>
        <th>Update</th>
      </tr>

      <div style='display: contents' id='events' />
    </table>
  </>;

  constructor() {
    super();
    this.#events_elem = this.shadowRoot.getElementById('events');
  }

  add({ id, posted, cols }){
    const event = Object.assign(new Event(), { posted, cols })
    this.#events[id] = event;
    this.#ids.push(id);
    this.#ids.sort(this.#compare.bind(this));

    // Update DOM.
    this.#events_elem.appendChild(event);
  }

  // TODO Does this handle event reordering? I believe not currently.
  update({ id, posted, cols }) {
    if (posted !== undefined) {
      this.#events[id].posted = posted;
    }

    if (cols !== undefined) {
      this.#events[id].cols = cols;
      this.ids.sort(this.#compare.bind(this));
    }
  }

  delete(delete_id) {
    // Remove from ID list.
    this.ids = this.ids.filter(id => id !== delete_id);

    // Remove from DOM.
    this.#events.remove();

    // Remove from event map.
    delete this.#events[delete_id];
  }

  #compare(a, b) {
    // TODO change `0` to `utc_col_index`
    return this.#events[b].cols[0] - this.#events[a].cols[0];
  }

  #mutate(old) {
    mutate(this.#events_elem, old, this.#ids.map(id => this.#events[id]));
  }
}
