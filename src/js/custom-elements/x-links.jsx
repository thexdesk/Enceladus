import createElement from '../createElement';

class Links extends HTMLElement {
  #github = <a
    class='github'
    target='_blank'
    href='https://github.com/r-spacex/Enceladus-LTI'
    aria-description='reddit thread'
  />;
  #reddit = <a
    class='reddit'
    target='_blank'
    style='display: none'
    aria-hidden='true'
    aria-description='source code'
  />;

  #reddit_id = null;

  /** @type {string | null} */
  get reddit_id() {
    return this.#reddit_id;
  }

  /** @param {string | null} value */
  set reddit_id(value) {
    this.#reddit_id = value;

    if (value === null) {
      this.#reddit.style.display = 'none';
      this.#reddit.setAttribute('aria-hidden', 'true');
    } else {
      this.#reddit.href = `https://reddit.com/${value}`;
      this.#reddit.style.removeProperty('display');
      this.#reddit.removeAttribute('aria-hidden');
    }
  }

  /**
   * Add the relevant CSS
   * along with icons for reddit and GitHub.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-links.bundle.css'/>
      { this.#reddit }
      { this.#github }
    </>);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
  }
}

customElements.define('x-links', Links);
