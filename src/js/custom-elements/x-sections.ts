import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML, repeat } from '../helpers/directives';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import marked from 'marked';

type Section = Pick<APISectionData, 'name' | 'content'>;

@sealed
@customElement('x-sections' as any)
@attribute('role', 'region')
export class Sections extends LitElement {
  public render(): TemplateResult {
    return html`
      <link rel='stylesheet' href='x-sections.bundle.css'>
      ${repeat(this.ids, id => html`
        <div>
          <h1>${this.sections[id].name}</h1>
          ${unsafeHTML(marked(this.sections[id].content))}
        </div>
      `)}
    `;
  }

  public add({ id, name, content }: Section & ID, update: boolean = true): void {
    this.sections[id] = { name, content };
    this.ids.push(id);

    if (update) {
      this.requestUpdate(); // tslint:disable-line no-floating-promises
    }
  }

  public delete(id: number): void {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.sections[id];
  }

  @property public ids: number[] = [];
  @property public sections: { [key: number]: Section } = {};
}
