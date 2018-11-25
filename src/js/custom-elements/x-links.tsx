import createElement from '../createElement'; createElement;
import { customElement, defaultAttribute, sealed } from '../helpers/decorators';

@sealed
@customElement('x-links')
@defaultAttribute('role', 'navigation')
export class Links extends HTMLElement {
  private _github: HTMLAnchorElement = <a
    class='github'
    target='_blank'
    href='https://github.com/r-spacex/Enceladus-LTI'
    aria-description='reddit thread'
  />;
  private _reddit: HTMLAnchorElement = <a
    class='reddit'
    target='_blank'
    aria-hidden='true'
    aria-description='source code'
  />;

  private _reddit_id: Nullable<string> = null;

  get reddit_id() {
    return this._reddit_id;
  }
  set reddit_id(value) {
    this._reddit_id = value;

    if (value === null) {
      this._reddit.style.display = 'none';
      this._reddit.setAttribute('aria-hidden', 'true');
    } else {
      this._reddit.href = `https://reddit.com/${value}`;
      this._reddit.style.removeProperty('display');
      this._reddit.removeAttribute('aria-hidden');
    }
  }

  /**
   * Add the relevant CSS
   * along with icons for reddit and GitHub.
   */
  constructor() {
    super();

    this._reddit.style.display = 'none';

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-links.bundle.css'/>
      { this._reddit }
      { this._github }
    </>);
  }
}
