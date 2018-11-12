import createElement from '../createElement';

class YouTube extends HTMLElement {
  #id = null;
  #video = <iframe title='YouTube'/>;

  /** @type {string | null} */
  get id() {
    return this.#id;
  }

  /** @param {string | null} id */
  set id(value) {
    this.#id = value;
    if (value === null) {
      this.#video.src = '';
    } else {
      this.#video.src = `https://youtube.com/embed/${this.#id}?autoplay=0`;
    }
    this._set_display();
  }

  /**
   * Set the display property of the YouTube embed.
   *
   * @private
   */
  _set_display() {
    if (this.#id === null) {
      this.#video.style.display = 'none';
    } else {
      this.#video.style.removeProperty('display');
    }
  }

  /**
   * Add the relevant CSS and the YouTube embed.
   */
  constructor() {
    super();

    this._set_display();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='youtube-video.bundle.css'/>
      { this.#video }
    </>);
  }
}

customElements.define('youtube-video', YouTube);
