import { LitElement, html, customElement, property } from '@polymer/lit-element';
import { sealed } from '../helpers/decorators';

@sealed
@customElement('x-links' as any)
export class Links extends LitElement {
  render() {
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

  @property({ attribute: false }) reddit_id: Nullable<string> = null;
  @property({ reflect: true }) role = 'navigation';
}
