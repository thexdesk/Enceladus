import { assign_defined } from '@jhpratt/assign-defined';
import { html, LitElement } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import marked from 'marked';
import css from '../../css/inlined/x-events.pcss';
import { attribute, customElement, property, sealed } from '../helpers/decorators';
import { repeat, unsafeHTML } from '../helpers/directives';

// TODO Generalize the events handler,
// allowing the UTC column to be in _any_ location.
// Currently, we're working on the assumption
// that the data is originating from this interface.

type Event = Pick<APIEvent, 'id' | 'posted' | 'cols'>;

@sealed
@customElement('x-events')
@attribute('role', 'table region')
@attribute('aria-live', 'polite')
export class Events extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        ${css}
      </style>
      <header>
        <h1>LIVE UPDATES</h1>

        <div role="row">
          <div role="columnheader">Time</div>
          <div role="columnheader">Count</div>
          <div role="columnheader">Update</div>
        </div>
      </header>

      ${repeat(this.ids, id => {
      const {
        posted,
        cols: [utc, terminal_count, message],
      } = this.events[id];

      if (!posted) {
        return nothing;
      }

      const time = new Date((utc as number) * 1_000).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
      });

      return html`
          <div role="row">
            <div class="tnum" role="cell">${time}</div>
            <div class="tnum" role="cell">${terminal_count}</div>
            <div role="cell">${unsafeHTML(marked(message as string))}</div>
          </div>
        `;
    })}
    `;
  }

  public add({ id, posted, cols }: Create<Event>, update: boolean = true): Promise<unknown> | void {
    this.events[id] = { posted, cols };
    this.ids.push(id);

    this.ids.sort(this.compare.bind(this));

    if (update) {
      return this.requestUpdate();
    }
  }

  // cannot be named `update` due to conflict with LitElement
  public modify({ id, posted, cols }: Update<Event>): Promise<unknown> {
    assign_defined(this.events[id], { posted, cols });

    if (cols !== undefined) {
      this.ids.sort(this.compare.bind(this));
    }
    return this.requestUpdate();
  }

  public delete(id: number): Promise<unknown> {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.events[id];
    return this.updateComplete;
  }

  private compare(a: number, b: number): number {
    return (this.events[b].cols[0] as number) - (this.events[a].cols[0] as number);
  }

  @property public ids: number[] = [];
  @property public events: { [key: number]: Pick<Event, 'posted' | 'cols'> } = {};
}
