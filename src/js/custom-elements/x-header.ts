import './x-countdown';
import { LitElement, html } from '@polymer/lit-element';
import { sealed, property, attribute, customElement } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';

@sealed
@customElement('x-header' as any)
@attribute('role', 'region')
export class Header extends LitElement {
  public render(): TemplateResult {
    return html`
      <link rel='stylesheet' href='x-header.bundle.css'>
      <div role='header' aria-description='launch name'>${this.launch_name}</div>
      <x-countdown .t0='${this.t0}'></x-countdown>
    `;
  }

  @property public launch_name = '';
  @property public t0: Nullable<number> = null;
}
