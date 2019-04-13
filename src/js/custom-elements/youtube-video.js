import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { property, customElement } from '../helpers/decorators.js';
import { nothing } from '../index.js';

@customElement('youtube-video')
export class YouTube extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/youtube-video.css'>

      <iframe
        title='YouTube'
        src='${do {
          if (this.youtube_id === null) '';
          else `https://youtube.com/embed/${this.youtube_id}?autoplay=0`;
        }}'
        ?hidden=${this.youtube_id === null}
      ></iframe>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  @property youtube_id = null;
}
