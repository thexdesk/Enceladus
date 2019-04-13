import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { customElement } from '../helpers/decorators.js';

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

@customElement('x-countdown')
export class Countdown extends LitElement {
  _t0: number | null = null;
  _sign: '+' | '-' = '-';
  _hours = 0;
  _minutes = 0;
  _seconds = 0;
  _interval: number | null = null;

  connectedCallback() {
    this.setAttribute('role', 'timer');
    this.setAttribute('aria-description', 'countdown-clock');
    super.connectedCallback();
  }

  render() {
    return html`
      <link rel='stylesheet' href='./css/components/x-countdown.css'>
      ${this.display_time}
    `;
  }

  get t0() {
    return this._t0;
  }
  set t0(value) {
    this._t0 = value;

    if (value === null) {
      clearInterval(this._interval);
      this._interval = null;
    } else if (this._interval === null) {
      this._interval = window.setInterval(this._update_clock.bind(this), 1_000);
    }

    this._update_clock();
  }

  /**
   * Time to be displayed on the countdown, if any.
   */
  get display_time() {
    return do {
      if (this._t0 === null) {
        '';
      } else if (this._hours >= 48) {
        `T${this._sign}${Math.floor(this._hours / 24)}d ${this._hours % 24}h`;
      } else if (this._hours >= 1) {
        `T${this._sign}${this._hours}:${this._minutes |> pad}:${this._seconds |> pad}`;
      } else {
        `T${this._sign}${this._minutes}:${this._seconds |> pad}`;
      }
    }
  }

  /**
   * Update the countdown clock.
   */
  _update_clock() {
    if (this._t0 === null) {
      return;
    }

    this._sign = do {
      if (this._t0 < Date.now() / 1000) {
        '+';
      } else {
        '-';
      }
    };

    const diff = this._t0 - Date.now() / 1000 |> Math.abs |> Math.floor;

    this._hours = diff / 3600 |> Math.floor;
    this._minutes = (diff % 3600) / 60 |> Math.floor;
    this._seconds = diff % 60;

    return this.requestUpdate();
  }

  disconnectedCallback() {
    if (this._interval !== null) {
      clearInterval(this._interval);
      this._interval = null;
    }

    super.disconnectedCallback();
  }
}
