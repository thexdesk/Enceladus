import { assign_defined } from '@jhpratt/assign-defined';
import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
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
  render() {
    return html`
      <style>
        ${css}
      </style>
      <header>
        <h1>LIVE UPDATES</h1>

        <div role='row'>
          <div role='columnheader'>Time</div>
          <div role='columnheader'>Count</div>
          <div role='columnheader'>Update</div>
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
          <div role='row'>
            <div class='tnum' role='cell'>${time}</div>
            <div class='tnum' role='cell'>${terminal_count}</div>
            <div role='cell'>${unsafeHTML(marked(message as string))}</div>
          </div>
        `;
      })}
    `;
  }

  add({ id, posted, cols }: Create<Event>, update = true) {
    this.events[id] = { posted, cols };
    this.ids.push(id);

    this.ids.sort(this.compare.bind(this));

    if (update) {
      return this.requestUpdate();
    }
    return Promise.resolve();
  }

  // cannot be named `update` due to conflict with LitElement
  modify({ id, posted, cols }: Update<Event>) {
    assign_defined(this.events[id], { posted, cols });

    if (cols !== undefined) {
      this.ids.sort(this.compare.bind(this));
    }
    return this.requestUpdate();
  }

  delete(id: number) {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.events[id];
    return this.updateComplete;
  }

  private compare(a: number, b: number) {
    // TODO change `0` to `utc_col_index`
    return (this.events[b].cols[0] as number) - (this.events[a].cols[0] as number);
  }

  @property ids: number[] = [];
  @property events: { [key: number]: Pick<Event, 'posted' | 'cols'> } = {};
}
