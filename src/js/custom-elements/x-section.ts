import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { sealed, role } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

@sealed
@customElement('x-section' as any)
@role('article')
export class Section extends LitElement {
  public render(): TemplateResult {
    return html`
      <link rel='stylesheet' href='x-section.bundle.css'>
      <h1>${this.header}</h1>
      <div>${unsafeHTML(this.body)}</div>
    `;
  }

  @property({ attribute: false }) public header = '';
  @property({ attribute: false }) public body = '';
}
