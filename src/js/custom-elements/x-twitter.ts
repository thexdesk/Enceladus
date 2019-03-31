import { sealed, customElement } from '../helpers/decorators';

@sealed
@customElement('x-twitter')
export class Twitter extends HTMLElement {
  /**
   * Add the Twitter widget underneath a header.
   *
   * Should not be in a constructor,
   * as Twitter's embed code doesn't work
   * with a shadow DOM.
   * That's also why we're not using LitElement.
   */
  connectedCallback() {
    const fragment = document.createDocumentFragment();

    const header = fragment.appendChild(document.createElement('header'));
    header.innerHTML = 'TWITTER';

    const link = fragment.appendChild(document.createElement('a'));
    link.classList.add('twitter-timeline');
    link.setAttribute('data-link-color', '#ff5100');
    link.setAttribute('data-dnt', 'true');
    link.setAttribute('data-theme', 'dark');
    link.setAttribute('data-chrome', 'noheader nofooter noborders noscrollbar transparent');
    link.setAttribute('href', 'https://twitter.com/theZcuber/lists/r-spacex-mission-control');

    this.appendChild(fragment);

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'region');
    }
  }
}
