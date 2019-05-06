import {
  assign_defined,
} from 'https://unsafe-production.jspm.io/npm:@jhpratt/assign-defined@0.1.0/index.js';
import { html, LitElement } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import marked from 'https://unsafe-production.jspm.io/npm:marked@0.6.2';
import { property } from '../helpers/decorators.js';
import { repeat, unsafeHTML } from '../helpers/directives.js';

// TODO Generalize the events handler,
// allowing the UTC column to be in _any_ location.
// Currently, we're working on the assumption
// that the data is originating from this interface.

export class Events extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/x-events.css'>

      <h1>LIVE UPDATES</h1>

      <table>
        <tr>
          <th>Time</th>
          <th>Count</th>
          <th>Update</th>
        </tr>

        ${repeat(this.ids, id => {
          const {
            posted,
            cols: [utc, terminal_count, message],
          } = this.events[id];

          if (!posted) {
            return '';
          }

          const time = new Date(utc * 1_000)
            .toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
            });

          return html`
            <tr>
              <td>${time}</td>
              <td>${terminal_count}</td>
              <td>${message |> marked |> unsafeHTML}</td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  connectedCallback() {
    this.setAttribute('role', 'table region');
    this.setAttribute('aria-live', 'polite');
    super.connectedCallback();
  }

  add({ id, posted, cols }, update = true) {
    this.events[id] = { posted, cols };
    this.ids.push(id);

    this.ids.sort(this._compare.bind(this));

    if (update) {
      return this.requestUpdate();
    }
  }

  // Cannot be named `update` due to conflict with LitElement.
  modify({ id, posted, cols }) {
    assign_defined(this.events[id], { posted, cols });

    if (cols !== undefined) {
      this.ids.sort(this._compare.bind(this));
    }
    return this.requestUpdate();
  }

  delete(id: number) {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.events[id];
    return this.updateComplete;
  }

  _compare(a: number, b: number) {
    // TODO change `0` to `utc_col_index`
    return this.events[b].cols[0] - this.events[a].cols[0];
  }

  @property ids = [];
  @property events = {};
}
