import { LitElement, html } from '@polymer/lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import css from '../../css/x-links.pcss';

@sealed
@customElement('x-links' as any)
@attribute('role', 'navigation')
export class Links extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>${css}</style>
      <a
        class='reddit'
        target='_blank'
        rel='noopener'
        aria-hidden='${this.reddit_id === null}'
        aria-description='reddit thread'
        href='${this.reddit_id === null ? '' : `https://reddit.com/${this.reddit_id}`}'
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

  @property public reddit_id: Nullable<string> = null;
}
