import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML, repeat } from '../helpers/directives';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import { assign_defined } from '@jhpratt/assign-defined';
import css from '../../css/inlined/x-events.pcss';

type Event = Pick<APIEventData, 'posted' | 'utc' | 'terminal_count' | 'message'>;

@sealed
@customElement('x-events' as any)
@attribute('role', 'table region')
@attribute('aria-live', 'polite')
export class Events extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>${css}</style>
      <header>
        <h1>LIVE UPDATES</h1>

        <div role='row'>
          <div role='columnheader'>Time</div>
          <div role='columnheader'>Count</div>
          <div role='columnheader'>Update</div>
        </div>
      </header>

      ${repeat(this.ids, id => {
        const event = this.events[id];
        const time = new Date(event.utc * 1_000)
          .toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });

        return event.posted
        ? html`
          <div role='row'>
            <div class='tnum' role='cell'>${time}</div>
            <div class='tnum' role='cell'>${event.terminal_count}</div>
            <div role='cell'>${unsafeHTML(event.message)}</div>
          </div>
        ` : html``;
      })}
    `;
  }

  public add(
    { id, posted, utc, terminal_count, message }: Create<Event>,
    update: boolean = true,
  ): Promise<unknown> | void {
    this.events[id] = { posted, utc, terminal_count, message };
    this.ids.push(id);

    this.ids.sort(this.compare);

    if (update) {
      return this.requestUpdate();
    }
  }

  // cannot be named `update` due to conflict with LitElement
  public modify({ id, posted, utc, terminal_count, message }: Update<Event>): Promise<unknown> {
    assign_defined(this.events[id], { posted, utc, terminal_count, message });
    if (utc !== undefined) {
      this.ids.sort(this.compare);
    }
    return this.requestUpdate();
  }

  public delete(id: number): Promise<unknown> {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.events[id];
    return this.updateComplete;
  }

  private compare(a: number, b: number): number {
    return this.events[b].utc - this.events[a].utc;
  }

  @property public ids: number[] = [];
  @property public events: { [key: number]: Event } = {};
}
