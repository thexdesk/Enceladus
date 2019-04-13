import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { customElement } from '../../helpers/decorators.js';
import { get_thread_data, initialize } from '../../initialize.js';

@customElement('init-modal')
export class InitModal extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/modal.css'>
      <div class='modal'>
        <div>Continuing an existing thread?</div>
        <label for='thread_id'>Enter a thread ID.</label>
        <input @keyup='${this._submit_continue_if_enter.bind(this)}' id='thread_id' type='number'>
        <button @click='${this._submit_continue.bind(this)}'>Launch!</button>
        <div id='continuation_error'></div>
      </div>
    `;
  }

  async connectedCallback() {
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', '');

    super.connectedCallback();

    // we want to be sure that the input element is present,
    // so let's await the initial rendering
    await this.updateComplete;
    this.shadowRoot.querySelector('input').focus();
  }

  _submit_continue_if_enter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      return this._submit_continue();
    }
  }

  async _get_thread_data() {
    const id = this.shadowRoot.querySelector('#thread_id').value |> Number;

    // reject early if possible to avoid server call
    if (!Number.isInteger(id) || id < 1) {
      this.shadowRoot.getElementById('continuation_error').innerHTML = 'Thread not found.';
      return Promise.reject();
    }

    try {
      return get_thread_data(id);
    } catch (err) {
      this.shadowRoot.getElementById('continuation_error').innerHTML = 'Thread not found.';
      return Promise.reject(err);
    }
  }

  async _submit_continue() {
    const id = this._get_thread_data() |> await # |> initialize |> await #;
    const url = new URL(window.location.href);
    url.searchParams.set('thread_id', id);
    window.history.replaceState(undefined, '', url);
    this.remove();
  }
}
