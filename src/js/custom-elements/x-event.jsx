import createElement from '../createElement';

class Event extends HTMLElement {
  posted = false;

  #utc = <div class='tnum'/>;
  #terminal_count = <div class='tnum'/>;
  #message = <div/>;

  /** @type {string} */
  get utc() {
    return this.#utc.innerHTML;
  }

  /** @param {string} value */
  set utc(value) {
    this.#utc.innerHTML = value;
  }

  /** @type {string} */
  get terminal_count() {
    return this.#terminal_count.innerHTML;
  }

  /** @param {string} value */
  set terminal_count(value) {
    this.#terminal_count.innerHTML = value;
  }

  /** @type {string} */
  get messsage() {
    return this.#message.innerHTML;
  }

  /** @param {string} value */
  set message(value) {
    this.#message.innerHTML = value;
  }

  /**
   * Add the relevant CSS,
   * the UTC time,
   * the terminal count,
   * and the message.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-event.bundle.css'/>
      { this.#utc }
      { this.#terminal_count }
      { this.#message }
    </>);
  }
}

customElements.define('x-event', Event);
