import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { sealed, role } from '../helpers/decorators';

@sealed
@customElement('x-event' as any)
@role('row')
export class Event extends LitElement {
  render() {
    return this.posted
    ? html`
      <link rel='stylesheet' href='x-event.bundle.css'>
      <div class='tnum' role='cell'>${this.utc}</div>
      <div class='tnum' role='cell'>${this.terminal_count}</div>
      <div role='cell'>${this.message}</div>
    `
    : html`
      <link rel='stylesheet' href='x-event.bundle.css'>
    `;
  }

  @property({ attribute: false }) posted = false;
  @property({ attribute: false }) utc = -1;
  @property({ attribute: false }) terminal_count = '';
  @property({ attribute: false }) message = '';
}
