import { LitElement, html } from '@polymer/lit-element';
import { sealed, customElement, attribute } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import { get_thread_data, initialize } from '../initialize';
import css from '../../css/x-modal.pcss';

@sealed
@customElement('x-modal' as any)
@attribute('role', 'dialog')
@attribute('aria-modal', '')
@attribute('aria-label', 'Please enter a thread ID.')
export class Modal extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>${css}</style>
      <div class='modal'>
        <label>Please enter a thread ID.</label>
        <input @keyup='${this.submit_if_enter.bind(this)}' type='number'>
        <button @click='${this.submit.bind(this)}'>Launch!</button>
        <div id='error'></div>
      </div>
    `;
  }

  public async connectedCallback(): Promise<void> {
    // we want to be sure that the input element is present,
    // so let's await the initial rendering
    await this.updateComplete;
    this.shadowRoot!.querySelector('input')!.focus();
  }

  private submit_if_enter(e: KeyboardEvent): Promise<void> | void {
    if (e.key === 'Enter') {
      return this.submit();
    }
  }

  private async get_thread_data(): Promise<APIThreadData<true>> {
    const id = Number(this.shadowRoot!.querySelector('input')!.value);

    // reject early if possible to avoid server call
    if (!Number.isInteger(id) || id < 1) {
      this.shadowRoot!.getElementById('error')!.innerHTML = 'Thread not found.';
      return Promise.reject();
    }

    return get_thread_data(id)
      .catch(err => {
        this.shadowRoot!.getElementById('error')!.innerHTML = 'Thread not found.';
        return Promise.reject(err);
      });
  }

  private async submit(): Promise<void> {
    return this.get_thread_data()
      .then(initialize)
      .then(id => {
        window.history.replaceState(undefined, '', `?thread_id=${id}`);
        this.remove();
      });
  }
}
