import createElement from '../createElement';

class Event extends HTMLElement {
  posted = false;

  #utc = <div class='tnum'/>;
  #terminal_count = <div class='tnum'/>;
  #message = <div/>;

  get utc() {
    return this.#utc.innerHTML;
  }
  set utc(value) {
    this.#utc.innerHTML = value;
  }

  get terminal_count() {
    return this.#terminal_count.innerHTML;
  }
  set terminal_count(value) {
    this.#terminal_count.innerHTML = value;
  }

  get messsage() {
    return this.#message.innerHTML;
  }
  set message(value) {
    this.#message.innerHTML = value;
  }

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
