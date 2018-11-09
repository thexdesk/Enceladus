import createElement from '../createElement';

class YouTube extends HTMLElement {
  #id = null;
  #video = <iframe title='YouTube'/>;

  get id() {
    return this.#id;
  }
  set id(value) {
    this.#id = value;
    if (value === null) {
      this.#video.src = '';
    } else {
      this.#video.src = `https://youtube.com/embed/${this.#id}?autoplay=0`;
    }
    this._set_display();
  }

  _set_display() {
    this.#video.style.display = do {
      if (this.#id === null) {
        'none';
      } else {
        'block';
      }
    };
  }

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
