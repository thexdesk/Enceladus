import createElement from '../createElement';

/** @type {{ [key: number]: Section }} */
export const sections = Object.create(null);

/**
 * When creating a section,
 * be sure the `db-id` attribute is set.
 */

class Section extends HTMLElement {
  #header = <h1/>;
  #body = <div/>;

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

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-section.bundle.css'/>
      { this.#header }
      { this.#body }
    </>);
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
