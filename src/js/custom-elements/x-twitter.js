import { customElement } from '../helpers/decorators.js';

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

    Object.entries({
      'data-link-color': '#ff5100',
      'data-dnt': 'true',
      'data-theme': 'dark',
      'data-chrome': 'noheader nofooter noborders noscrollbar transparent',
      'href': 'https://twitter.com/EnceladusLTI/lists/enceladus-lti',
    }).forEach(attr => link.setAttribute(...attr));

    this.appendChild(fragment);

    this.setAttribute('role', 'region');
  }
}
