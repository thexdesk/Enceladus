import './x-countdown.jsx';
import createElement from '../createElement';

class Header extends HTMLElement {
  #countdown = <x-countdown/>;
  #launch_name = <div role='header' aria-description='launch name'/>;

  /** @type {number | null} */
  get t0() {
    return this.#countdown.t0;
  }

  /** @param {number | null} value */
  set t0(value) {
    this.#countdown.t0 = value;
  }

  /** @type {string} */
  get launch_name() {
    return this.#launch_name.innerHTML;
  }

  /** @param {string} value */
  set launch_name(value) {
    this.#launch_name.innerHTML = value;
  }

  /**
   * Add the relevant CSS,
   * the launch name,
   * and a countdown.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-header.bundle.css'/>
      { this.#launch_name }
      { this.#countdown }
    </>);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'region');
    }
  }
}

customElements.define('x-header', Header);
