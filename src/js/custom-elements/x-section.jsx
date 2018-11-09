import createElement from '../createElement';

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
}

customElements.define('x-section', Section);
