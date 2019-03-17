import { LitElement, html } from 'lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult, nothing } from 'lit-html';
import css from '../../css/inlined/x-links.pcss';

@sealed
@customElement('x-links')
@attribute('role', 'navigation')
export class Links extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        ${css}
      </style>
      <a
        class="reddit"
        target="_blank"
        rel="noopener"
        aria-hidden="${this.post_id === null}"
        aria-description="reddit thread"
        href="${this.post_id === null ? nothing : `https://reddit.com/${this.post_id}`}"
      ></a>

      <a
        class="github"
        target="_blank"
        rel="noopener"
        aria-description="source code"
        href="https://github.com/r-spacex/Enceladus-LTI"
      ></a>
    `;
  }

  @property public post_id: Nullable<string> = null;
}
