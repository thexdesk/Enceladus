import { LitElement, html } from '@polymer/lit-element';
import { sealed, role, property, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

@sealed
@customElement('x-links' as any)
@role('navigation')
export class Links extends LitElement {
  public render(): TemplateResult {
    return html`
      <link rel='stylesheet' href='x-links.bundle.css'>
      <a
        class='reddit'
        target='_blank'
        aria-hidden='${this.reddit_id === null}'
        aria-description='reddit thread'
        href='${this.reddit_id === null ? '' : `https://reddit.com/${this.reddit_id}`}'
      ></a>
      <a
        class='github'
        target='_blank'
        aria-description='source code'
        href='https://github.com/r-spacex/Enceladus-LTI'
      ></a>
    `;
  }

  @property public reddit_id: Nullable<string> = null;
}
