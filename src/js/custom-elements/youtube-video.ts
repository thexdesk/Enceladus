import { LitElement, html } from '@polymer/lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import css from '../../css/inlined/youtube-video.pcss';

@sealed
@customElement('youtube-video' as any)
@attribute('role', 'region')
export class YouTube extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>${css}</style>
      <iframe
        title='YouTube'
        src='${
          this.video_id === null
          ? ''
          : `https://youtube.com/embed/${this.video_id}?autoplay=0`
        }'
        ?hidden=${this.video_id === null}
      ></iframe>
    `;
  }

  @property public video_id: Nullable<string> = null;
}
