import createElement from '../createElement';

class Twitter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-twitter.bundle.css'/>
      <script src='https://platform.twitter.com/widgets.js' charset='utf-8'/>
      <header>TWITTER</header>
      <a
        class='twitter-timeline'
        data-link-color='#ff5100'
        data-dnt='true'
        data-theme='dark'
        data-chrome='noheader nofooter noborders noscrollbar transparent'
        href='https://twitter.com/theZcuber/lists/r-spacex-mission-control'
      />
    </>);
  }
}

customElements.define('x-twitter', Twitter);
