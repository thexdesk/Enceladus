import { _ } from 'param.macro';
import createElement from '../createElement';

class Twitter extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    const css = <link rel='stylesheet' href='x-twitter.bundle.css'/>;

    const script = <script
      src='https://platform.twitter.com/widgets.js'
      charset='utf-8'
    />;

    const header = <header>TWITTER</header>;

    const twitter = <a
      class='twitter-timeline'
      data-link-color='#ff5100'
      data-dnt='true'
      data-theme='dark'
      data-chrome='noheader nofooter noborders noscrollbar transparent'
      href='https://twitter.com/theZcuber/lists/r-spacex-mission-control'
    />;

    [
      css,
      script,
      header,
      twitter,
    ].forEach(shadow.appendChild(_));
  }
}

customElements.define('x-twitter', Twitter);
