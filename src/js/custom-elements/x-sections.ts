import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML, repeat } from '../helpers/directives';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import marked from 'marked';
import { assign_defined } from '@jhpratt/assign-defined';
import css from '../../css/x-sections.pcss';

type Section = Pick<APISectionData<boolean>, 'name' | 'content' | 'events_id'>;

@sealed
@customElement('x-sections' as any)
@attribute('role', 'region')
export class Sections extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>${css}</style>
      <header>LAUNCH INFORMATION</header>
      ${repeat(this.ids, id => html`
        <div>
          <h1>${this.sections[id].name}</h1>
          ${unsafeHTML(marked(this.sections[id].content))}
        </div>
      `)}
    `;
  }

  public add(
    { id, name, content, events_id = [] }: Section & ID,
    update: boolean = true,
  ): Promise<unknown> | void {
    this.sections[id] = { name, content, events_id };
    this.ids.push(id);

    if (update) {
      return this.requestUpdate();
    }
  }

  // cannot be named `update` due to conflict with LitElement
  public modify({ id, name, content, events_id }: Partial<Section> & ID): Promise<unknown> {
    assign_defined(this.sections[id], { id, name, content, events_id });
    return this.requestUpdate();
  }

  public delete(id: number): Promise<unknown> {
    this.ids = this.ids.filter($ => $ !== id);
    delete this.sections[id];
    return this.updateComplete;
  }

  @property public ids: number[] = [];
  @property public sections: { [key: number]: Section } = {};
}
