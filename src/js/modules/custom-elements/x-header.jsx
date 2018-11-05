import './x-countdown.jsx';
import { _ } from 'param.macro';
import createElement from '../createElement';

class Header extends HTMLElement {
  #countdown;
  #launch_name;

  get t0() {
    return this.#countdown.t0;
  }
  set t0(value) {
    this.#countdown.t0 = value;
  }

  get launch_name() {
    return this.#launch_name.innerHTML;
  }
  set launch_name(value) {
    this.#launch_name.innerHTML = value;
  }

  /**
   * Called when the element is created.
   * Creates a shadow DOM containing the launch name and a countdown clock,
   * along with the relevant CSS.
   */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    this.#launch_name = <div/>;
    this.#countdown = <x-countdown/>;

    [
      <link rel='stylesheet' href='x-header.bundle.css'/>,
      this.#launch_name,
      this.#countdown,
    ].forEach(shadow.appendChild(_));
  }
}

customElements.define('x-header', Header);
