import styles from 'css/components/Sections';
import { Section } from './Section';
import { mutate as reorder } from 'js/rearrange-elements';

@Attr('role', 'region')
export class Sections extends CustomElement {
  // Sorted array of IDs, to be used as a key for `this.#sections`.
  #ids = [];

  // Called by thread socket handler.
  set ids(value) {
    const old_elems = this.#ids.map(id => this.#sections[id]);
    this.#ids = value;
    reorder(this.#sections_elem, old_elems, value.map(id => this.#sections[id]));
  }

  // Map of IDs to `Section` objects. All objects must be present on the DOM.
  #sections = Object.create(null);

  static html = <>
    <style>{styles}</style>

    <header>LAUNCH INFORMATION</header>
    <ce:contents ref:named='sections_elem' />
  </>;

  add({ id, name, content }) {
    this.#sections[id] = Object.assign(new Section(), { name, content });
    this.#ids.push(id);

    // Update DOM.
    this.#sections_elem.appendChild(this.#sections[id]);
  }

  update({ id, name, content }) {
    Object
      .entries({ name, content })
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        this.#sections[id][key] = value;
      });
  }

  delete(delete_id) {
    // Remove from ID list.
    this.#ids = this.#ids.filter(id => id !== delete_id);

    // Remove from DOM.
    this.#sections[delete_id].remove();

    // Remove from section map.
    delete this.#sections[delete_id];
  }
}
