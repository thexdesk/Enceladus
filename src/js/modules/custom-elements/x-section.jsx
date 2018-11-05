import { _ } from 'param.macro';
import createElement from '../createElement';

/** @type {{ [key: number]: Section }} */
export const sections = Object.create(null);

/**
 * When creating a section,
 * be sure the `db-id` attribute is set.
 */

class Section extends HTMLElement {
  #header;
  #body;

  get header() {
    return this.#header.innerHTML;
  }
  set header(value) {
    this.#header.innerHTML = value;
  }

  get body() {
    return this.#body.innerHTML;
  }
  set body(value) {
    this.#body.innerHTML = value;
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    const css = <link rel='stylesheet' href='x-section.bundle.css'/>;
    this.#header = <h1/>;
    this.#body = <div/>;

    [
      css,
      this.#header,
      this.#body,
    ].forEach(shadow.appendChild(_));
  }

  connectedCallback() {
    const id = this.getAttribute('db-id');

    if (id === null) {
      // eslint-disable-next-line no-console
      console.warn('`x-section` elements must have the `db-id` attribute set, indicating its internal ID');
    } else {
      sections[id] = this;
    }
  }
}

customElements.define('x-section', Section);
