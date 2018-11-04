import link_css from '../helpers/link_css';

class YouTube extends HTMLElement {
  #id = null;
  #video;

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

    const shadow = this.attachShadow({ mode: 'closed' });

    shadow.appendChild(link_css('youtube-video'));

    this.#video = document.createElement('iframe');
    this.#video.title = 'YouTube';
    this._set_display();
    shadow.appendChild(this.#video);
  }
}

customElements.define('youtube-video', YouTube);
