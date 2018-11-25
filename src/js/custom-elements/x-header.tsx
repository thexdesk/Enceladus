import { Countdown } from './x-countdown';
import createElement from '../createElement'; createElement;
import { customElement, defaultAttribute, sealed } from '../helpers/decorators';

@sealed
@customElement('x-header')
@defaultAttribute('role', 'region')
export class Header extends HTMLElement {
  private _countdown: Countdown = <x-countdown/>;
  private _launch_name: HTMLDivElement = <div role='header' aria-description='launch name'/>;

  get t0(): number | null {
    return this._countdown.t0;
  }
  set t0(value) {
    this._countdown.t0 = value;
  }

  get launch_name(): string {
    return this._launch_name.innerHTML;
  }
  set launch_name(value) {
    this._launch_name.innerHTML = value;
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
      { this._launch_name }
      { this._countdown }
    </>);
  }
}
