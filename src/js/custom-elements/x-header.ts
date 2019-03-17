import './x-countdown';
import { LitElement, html } from 'lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import css from '../../css/inlined/x-header.pcss';

@sealed
@customElement('x-header')
@attribute('role', 'region')
export class Header extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        ${css}
      </style>
      <div role="header" aria-description="launch name">${this.display_name}</div>
      <x-countdown .t0="${this.space__t0}"></x-countdown>
    `;
  }

  @property public display_name = '';
  @property public space__t0: Nullable<number> = null;
}
