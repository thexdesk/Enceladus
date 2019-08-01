import styles from 'css/components/Events';
import { Event } from './Event';
import { mutate as reorder } from 'js/rearrange-elements';

@Attr('role', 'table region')
@Attr('aria-live', 'polite')
export class Events extends CustomElement {
  // Sorted array of IDs, to be used as a key for `this.#events`.
  #ids = [];

  // Called by thread socket handler.
  // Automatically reorders the child elements.
  set ids(value) {
    this.#ids = value;
    reorder(this.#events_elem, value.map(id => this.#events[id]));
  }

  // Map of IDs to `Event` objects. All objects must be present on the DOM.
  #events = Object.create(null);

  static html = <>
    <style>{styles}</style>

    <h1>LIVE UPDATES</h1>

    <table>
      <tr>
        <th>Time</th>
        <th>Count</th>
        <th>Update</th>
      </tr>

      <ce:contents ref:named='events_elem' />
    </table>
  </>;

  add({ id, posted, cols }){
    const event = Object.assign(new Event(), { posted, cols });
    this.#events[id] = event;
    this.#ids.push(id);

    // Update DOM.
    this.#events_elem.appendChild(event);
  }

  update({ id, posted, cols }) {
    Object
      .entries({ posted, cols })
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        this.#events[id][key] = value;
      });
  }

  delete(delete_id) {
    // Remove from ID list.
    this.ids = this.ids.filter(id => id !== delete_id);

    // Remove from DOM.
    this.#events.remove();

    // Remove from event map.
    delete this.#events[delete_id];
  }
}
