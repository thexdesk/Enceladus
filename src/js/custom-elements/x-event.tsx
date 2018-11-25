import createElement from '../createElement'; createElement;
import { customElement, defaultAttribute, sealed } from '../helpers/decorators';

@sealed
@customElement('x-event')
@defaultAttribute('role', 'row')
export class Event extends HTMLElement {
  public posted = false;

  private _utc: number = -1;
  private _utc_elem: HTMLDivElement = <div class='tnum' role='cell'/>;
  private _terminal_count: HTMLDivElement = <div class='tnum' role='cell'/>;
  private _message: HTMLDivElement = <div role='cell'/>;

  get utc() {
    return this._utc;
  }
  set utc(value) {
    this._utc = value;
    // TODO render onto element
    // this._utc_elem.innerHTML = value;
  }

  get terminal_count() {
    return this._terminal_count.innerHTML;
  }
  set terminal_count(value) {
    this._terminal_count.innerHTML = value;
  }

  get message() {
    return this._message.innerHTML;
  }
  set message(value) {
    this._message.innerHTML = value;
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
      { this._utc_elem }
      { this._terminal_count }
      { this._message }
    </>);
  }
}
