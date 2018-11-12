import createElement from '../createElement';

/**
 * When creating a section,
 * be sure the `db-id` attribute is set.
 */

class Section extends HTMLElement {
  #header = <h1/>;
  #body = <div/>;

  /** @type {string} */
  get header() {
    return this.#header.innerHTML;
  }

  /** @param {string} value */
  set header(value) {
    this.#header.innerHTML = value;
  }

  /** @type {string} */
  get body() {
    return this.#body.innerHTML;
  }

  /** @param {string} value */
  set body(value) {
    this.#body.innerHTML = value;
  }

  /**
   * Add the relevant CSS
   * along with the header and body of the seciton.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-section.bundle.css'/>
      { this.#header }
      { this.#body }
    </>);
  }
}

customElements.define('x-section', Section);
