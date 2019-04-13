import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { property, customElement } from '../helpers/decorators.js';
import { youtube_modal } from '../elements.js';

@customElement('x-links')
export class Links extends LitElement {
  connectedCallback() {
    this.setAttribute('role', 'navigation');
    super.connectedCallback();
  }

  render() {
    return html`
      <link rel='stylesheet' href='./css/components/x-links.css'>

      <a
        class='youtube'
        @click='${() => youtube_modal().hidden = false}'
      ></a>

      <a
        class='reddit'
        target='_blank'
        rel='noopener'
        aria-hidden='${this.post_id === null}'
        aria-description='reddit thread'
        href='${do {
          if (this.post_id === null) '';
          else `https://reddit.com/${this.post_id}`;
        }}'
      ></a>

      <a
        class='patreon'
        target='_blank'
        rel='noopener'
        aria-description='Patreon'
        href='https://patreon.com/EnceladusLTI'
      ></a>

      <a
        class='github'
        target='_blank'
        rel='noopener'
        aria-description='source code'
        href='https://github.com/r-spacex/Enceladus-LTI'
      ></a>
    `;
  }

  @property post_id = null;
}
