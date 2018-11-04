import link_css from '../helpers/link_css';

class Twitter extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    shadow.appendChild(link_css('x-twitter'));

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    shadow.appendChild(script);

    const header = document.createElement('header');
    header.innerHTML = 'TWITTER';
    shadow.appendChild(header);

    const twitter = document.createElement('a');
    twitter.classList.add('twitter-timeline');
    twitter.setAttribute('data-link-color', '#ff5100');
    twitter.setAttribute('data-dnt', 'true');
    twitter.setAttribute('data-theme', 'dark');
    twitter.setAttribute(
      'data-chrome',
      'noheader nofooter noborders noscrollbar transparent',
    );
    twitter.href = 'https://twitter.com/theZcuber/lists/r-spacex-mission-control';
    shadow.appendChild(twitter);
  }
}

customElements.define('x-twitter', Twitter);
