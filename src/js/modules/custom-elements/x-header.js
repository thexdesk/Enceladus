import './x-countdown';
import link_css from '../helpers/link_css';

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
    return this.#launch_name.innerHTML = value;
  }

  /**
   * Called when the element is created.
   * Creates a shadow DOM containing the launch name and a countdown clock,
   * along with the relevant CSS.
   */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    shadow.appendChild(link_css('x-header'));

    this.#launch_name = document.createElement('div');
    shadow.appendChild(this.#launch_name);

    this.#countdown = document.createElement('x-countdown');
    this.#countdown.t0 = null;
    shadow.appendChild(this.#countdown);
  }
}

customElements.define('x-header', Header);
