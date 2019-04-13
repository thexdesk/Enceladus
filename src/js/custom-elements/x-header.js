import './x-countdown.js';
import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { property, customElement } from '../helpers/decorators.js';

@customElement('x-header')
export class Header extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/x-header.css'>
      <div role='header' aria-description='launch name'>${this.display_name}</div>
      <x-countdown .t0='${this.space__t0}'></x-countdown>
    `;
  }

  connectedCallback() {
    this.setAttribute('role', 'region');
    super.connectedCallback();
  }

  @property display_name = '';
  @property space__t0 = null;
}
