import './x-countdown.jsx';
import createElement from '../createElement';

class Header extends HTMLElement {
  #countdown = <x-countdown/>;
  #launch_name = <div/>;

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

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-header.bundle.css'/>
      { this.#launch_name }
      { this.#countdown }
    </>);
  }
}

customElements.define('x-header', Header);
