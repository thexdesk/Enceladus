import { LitElement, html } from 'lit-element';
import { unsafeHTML, repeat } from '../helpers/directives';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import marked from 'marked';
import { assign_defined } from '@jhpratt/assign-defined';
import css from '../../css/inlined/x-sections.pcss';

type Section = Pick<APISection, 'id' | 'name' | 'content'>;

@sealed
@customElement('x-sections')
@attribute('role', 'region')
export class Sections extends LitElement {
  render() {
    return html`
      <style>
        ${css}
      </style>
      <header>LAUNCH INFORMATION</header>
      ${repeat(
        this.ids,
        id => html`
          <div>
            <h1>${this.sections[id].name}</h1>
            ${unsafeHTML(marked(this.sections[id].content))}
          </div>
        `,
      )}
    `;
  }

  add({ id, name, content }: Section, update = true) {
    this.sections[id] = { name, content };
    this.ids.push(id);

    if (update) {
      return this.requestUpdate();
    }
    return Promise.resolve();
  }

  // cannot be named `update` due to conflict with LitElement
  modify({ id, name, content }: Partial<Section> & { id: number }) {
    assign_defined(this.sections[id], { id, name, content });
    return this.requestUpdate();
  }

  delete(id: number) {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.sections[id];
    return this.updateComplete;
  }

  @property ids: number[] = [];
  @property sections: { [key: number]: Pick<Section, 'name' | 'content'> } = {};
}
