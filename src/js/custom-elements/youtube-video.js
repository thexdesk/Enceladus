import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { property } from '../helpers/decorators.js';

@Attr('role', 'region')
export class YoutubeVideo extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/youtube-video.css'>

      <iframe
        title='video'
        src='${this.video_url || ''}'
        ?hidden=${this.video_url === null}
      ></iframe>
    `;
  }

  @property video_url = null;
}
