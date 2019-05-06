import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { property } from '../helpers/decorators.js';

export class YoutubeVideo extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/youtube-video.css'>

      <iframe
        title='YouTube'
        src='${do {
          if (this.video_url === null) '';
          else `https://youtube.com/embed/${this.video_url}?autoplay=0`;
        }}'
        ?hidden=${this.video_url === null}
      ></iframe>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  @property video_url = null;
}
