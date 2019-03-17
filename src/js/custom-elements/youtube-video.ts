import { LitElement, html } from 'lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult, nothing } from 'lit-html';
import css from '../../css/inlined/youtube-video.pcss';

@sealed
@customElement('youtube-video')
@attribute('role', 'region')
export class YouTube extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        ${css}
      </style>
      <iframe
        title="YouTube"
        src="${this.youtube_id === null
          ? nothing
          : `https://youtube.com/embed/${this.youtube_id}?autoplay=0`}"
        ?hidden=${this.youtube_id === null}
      ></iframe>
    `;
  }

  @property public youtube_id: Nullable<string> = null;
}
