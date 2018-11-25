import createElement from '../createElement'; createElement;
import { customElement, defaultAttribute, sealed } from '../helpers/decorators';

@sealed
@customElement('youtube-video')
@defaultAttribute('role', 'region')
export class YouTube extends HTMLElement {
  private _video_id: Nullable<string> = null;
  private _video: HTMLIFrameElement = <iframe title='YouTube'/>;

  get video_id(): Nullable<string> {
    return this._video_id;
  }
  set video_id(value) {
    this._video_id = value;
    if (value === null) {
      this._video.src = '';
    } else {
      this._video.src = `https://youtube.com/embed/${this._video_id}?autoplay=0`;
    }
    this._set_display();
  }

  /**
   * Set the display property of the YouTube embed.
   */
  private _set_display() {
    if (this._video_id === null) {
      this._video.style.display = 'none';
    } else {
      this._video.style.removeProperty('display');
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
      { this._video }
    </>);
  }
}
