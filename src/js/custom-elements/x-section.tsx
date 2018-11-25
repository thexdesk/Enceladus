import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { sealed } from '../helpers/decorators';

@sealed
@customElement('x-section' as any)
export class Section extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='x-section.bundle.css'>
      <h1>${this.header}</h1>
      <div>${unsafeHTML(this.body)}</div>
    `;
  }

  @property({ attribute: false }) header = '';
  @property({ attribute: false }) body = '';
  @property({ reflect: true }) role = 'article';
}
