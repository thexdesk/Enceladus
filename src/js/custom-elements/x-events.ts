import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML, repeat } from '../helpers/directives';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

type Event = Pick<APIEventData, 'posted' | 'utc' | 'terminal_count' | 'message'>;

@sealed
@customElement('x-events' as any)
@attribute('role', 'table region')
@attribute('aria-live', 'polite')
export class Events extends LitElement {
  public render(): TemplateResult {
    return html`
      <link rel='stylesheet' href='x-events.bundle.css'>
      <div role='row'>
        <div role='columnheader'>UTC</div>
        <div role='columnheader'>Count</div>
        <div role='columnheader'>Update</div>
      </div>

      ${repeat(this.ids, id => {
        const event = this.events[id];
        return event.posted
        ? html`
          <div role='row'>
            <div class='tnum' role='cell'>${event.utc}</div>
            <div class='tnum' role='cell'>${event.terminal_count}</div>
            <div role='cell'>${unsafeHTML(event.message)}</div>
          </div>
        ` : html``;
      })}
    `;
  }

  public add(
    { id, posted, utc, terminal_count, message }: Event & ID,
    update: boolean = true,
  ): void {
    this.events[id] = { posted, utc, terminal_count, message };
    this.ids.push(id);

    if (update) {
      this.requestUpdate(); // tslint:disable-line no-floating-promises
    }
  }

  // cannot be named `update` due to conflict with LitElement
  public modify({ id, posted, utc, terminal_count, message }: Partial<Event> & ID): void {
    Object
      .entries({ posted, utc, terminal_count, message })
      .forEach(([key, value]) => {
        if (value !== undefined) {
          this.events[id][key as keyof Event] = value;
        }
      });

    this.requestUpdate(); // tslint:disable-line no-floating-promises
  }

  public delete(id: number): void {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.events[id];
  }

  @property public ids: number[] = [];
  @property public events: { [key: number]: Event } = {};
}
