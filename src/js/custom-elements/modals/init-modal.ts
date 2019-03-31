import { LitElement, html } from 'lit-element';
import { sealed, customElement, attribute } from '../../helpers/decorators';
import { get_thread_data, initialize } from '../../initialize';
import css from '../../../css/inlined/modal.pcss';

@sealed
@customElement('init-modal')
@attribute('role', 'dialog')
@attribute('aria-modal')
export class InitModal extends LitElement {
  render() {
    return html`
      <style>
        ${css}
      </style>
      <div class='modal'>
        <div>Continuing an existing thread?</div>
        <label for='thread_id'>Enter a thread ID.</label>
        <input @keyup='${this.submit_continue_if_enter.bind(this)}' id='thread_id' type='number'>
        <button @click='${this.submit_continue.bind(this)}'>Launch!</button>
        <div id='continuation_error'></div>
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();

    // we want to be sure that the input element is present,
    // so let's await the initial rendering
    await this.updateComplete;
    this.shadowRoot!.querySelector('input')!.focus();
  }

  private submit_continue_if_enter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      return this.submit_continue();
    }
    return Promise.resolve();
  }

  private async get_thread_data() {
    const id = Number(this.shadowRoot!.querySelector<HTMLInputElement>('#thread_id')!.value);

    // reject early if possible to avoid server call
    if (!Number.isInteger(id) || id < 1) {
      this.shadowRoot!.getElementById('continuation_error')!.innerHTML = 'Thread not found.';
      return Promise.reject();
    }

    try {
      return get_thread_data(id);
    } catch (err) {
      this.shadowRoot!.getElementById('continuation_error')!.innerHTML = 'Thread not found.';
      return Promise.reject(err);
    }
  }

  private async submit_continue() {
    const id = await initialize(await this.get_thread_data());
    window.history.replaceState(undefined, '', `?thread_id=${id}`);
    this.remove();
  }
}
