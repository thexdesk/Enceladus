import { LitElement, html } from '@polymer/lit-element';
import { sealed, role, property, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

@sealed
@customElement('x-event' as any)
@role('row')
export class Event extends LitElement {
  public render(): TemplateResult {
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

  @property public posted = false;
  @property public utc = -1;
  @property public terminal_count = '';
  @property public message = '';
}
