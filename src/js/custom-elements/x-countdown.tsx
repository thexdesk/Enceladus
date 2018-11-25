import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { sealed } from '../helpers/decorators';

/**
 * Given a number,
 * return the string containing exactly two digits.
 */
function pad(n: number) {
  if (n < 10) {
    return `0${n}`;
  }
  return String(n);
}

@sealed
@customElement('x-countdown' as any)
export class Countdown extends LitElement {
  private _t0: Nullable<number> = null;
  private _sign: '+' | '-' = '-';
  private _hours = 0;
  private _minutes = 0;
  private _seconds = 0;
  private _interval: Nullable<NodeJS.Timer> = null;

  get t0() {
    return this._t0;
  }
  set t0(value) {
    this._t0 = value;

    if (value === null) {
      clearInterval(this._interval!);
      this._interval = null;
    } else if (this._interval === null) {
      this._interval = setInterval(this._update_clock.bind(this), 1_000);
    }

    this._update_clock();
  }

  /**
   * Time to be displayed on the countdown, if any.
   */
  get display_time() {
    if (this._t0 === null) {
      return '';
    }
    if (this._hours >= 48) {
      return `T${this._sign}${Math.floor(this._hours / 24)}d ${this._hours % 24}h`;
    }
    return `T${this._sign}${this._hours}:${pad(this._minutes)}:${pad(this._seconds)}`;
  }

  /**
   * Update the countdown clock.
   */
  private _update_clock() {
    if (this._t0 === null) {
      return;
    }

    this._sign =
      this._t0 < Date.now() / 1000
      ? '+'
      : '-';

    const diff = Math.floor(Math.abs(this._t0 - Date.now() / 1000));

    this._hours = Math.floor(diff / 3600);
    this._minutes = Math.floor(diff % 3600 / 60);
    this._seconds = diff % 60;

    this.requestUpdate();
  }

  render() {
    return html`
      <link rel='stylesheet' href='x-countdown.bundle.css'>
      ${this.display_time}
    `;
  }

  disconnectedCallback() {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }
  }

  @property({ reflect: true }) role = 'timer';
  @property({ reflect: true }) ['aria-description'] = 'countdown clock';
}
