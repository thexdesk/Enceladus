import createElement from '../createElement'; createElement;
import { customElement, defaultAttribute, sealed } from '../helpers/decorators';

@sealed
@customElement('x-section')
@defaultAttribute('role', 'article')
export class Section extends HTMLElement {
  private _header: HTMLHeadingElement = <h1/>;
  private _body: HTMLDivElement = <div/>;

  get header(): string {
    return this._header.innerHTML;
  }
  set header(value) {
    this._header.innerHTML = value;
  }

  get body(): string {
    return this._body.innerHTML;
  }
  set body(value) {
    this._body.innerHTML = value;
  }

  /**
   * Add the relevant CSS
   * along with the header and body of the seciton.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'closed' }).appendChild(<>
      <link rel='stylesheet' href='x-section.bundle.css'/>
      { this._header }
      { this._body }
    </>);
  }
}
