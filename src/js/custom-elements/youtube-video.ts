import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { sealed, role } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

@sealed
@customElement('youtube-video' as any)
@role('region')
export class YouTube extends LitElement {
  public render(): TemplateResult {
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

  @property({ attribute: false }) public video_id: Nullable<string> = null;
}
