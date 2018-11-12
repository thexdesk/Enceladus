import createElement from '../createElement';

class Twitter extends HTMLElement {
  /**
   * Add the Twitter widget underneath a header.
   *
   * Should not be in a constructor,
   * as Twitter's embed code doesn't work
   * with a shadow DOM.
   */
  connectedCallback() {
    this.appendChild(<>
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
