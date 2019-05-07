import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { unsafeHTML, repeat } from '../helpers/directives.js';
import { property } from '../helpers/decorators.js';
import marked from 'https://unsafe-production.jspm.io/npm:marked@0.6.2';
import {
  assign_defined,
} from 'https://unsafe-production.jspm.io/npm:@jhpratt/assign-defined@0.1.0/index.js';

@Attr('role', 'region')
export class Sections extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/x-sections.css'>

      <header>LAUNCH INFORMATION</header>
      ${repeat(
        this.ids,
        id => html`
          <div>
            <h1>${this.sections[id].name}</h1>
            ${this.sections[id].content |> marked |> unsafeHTML}
          </div>
        `
      )}
    `;
  }

  add({ id, name, content }, update = true) {
    this.sections[id] = { name, content };
    this.ids.push(id);

    if (update) {
      return this.requestUpdate();
    }
  }

  // Cannot be named `update` due to conflict with LitElement.
  modify({ id, name, content }) {
    // FIXME Use the pipeline operator for readability once babel/babel-eslint#765 is resolved.
    assign_defined(this.sections[id], { id, name, content });
    return this.requestUpdate();
  }

  delete(id: number) {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.sections[id];
    return this.updateComplete;
  }

  @property ids = [];
  @property sections = {};
}
