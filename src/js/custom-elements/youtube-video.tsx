import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { sealed } from '../helpers/decorators';

@sealed
@customElement('youtube-video' as any)
export class YouTube extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='youtube-video.bundle.css'>
      <iframe
        title='YouTube'
        src='${
          this.video_id === null
          ? ''
          : `https://youtube.com/embed/${this.video_id}?autoplay=0`
        }'
      ></iframe>
    `;
  }

  @property({ attribute: false }) video_id: Nullable<string> = null;
  @property({ reflect: true }) role = 'region';
}
