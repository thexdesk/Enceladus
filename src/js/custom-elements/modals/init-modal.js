import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { get_thread_data, initialize } from '../../initialize.js';
import esfetch from 'https://unsafe-production.jspm.io/npm:esfetch@0.1.2/index.js';
import { is_host } from '../../index.js';
/* inline */ import vars from '../../helpers/variable-declarations.json';

// TODO Add an "advanced" option that allows configuring the event column headers.

const subreddit_regex = /^(?:\/?r\/)?([a-zA-Z0-9_]{1,20})$/gu;

@Attr('role', 'dialog')
@Attr('aria-modal')
export class InitModal extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/modal.css'>
      <div class='modal'>
        <div>Continuing an existing thread?</div>
        <label for='thread_id'>Enter a thread ID.</label>
        <input @keyup='${this._submit_continue_if_enter}' id='thread_id' type='number'>
        <button @click='${this._submit_continue}'>Launch!</button>
        <div id='continuation_error'></div>

      ${do {
        if (is_host()) {
          html`
            <hr>
            <div>Creating a new thread?</div>
            <label for='thread_title'>Thread title</label>
            <input @keyup='${this.submit_create_if_enter}' id='thread_title'>
            <label for='subreddit'>Subreddit (optional)</label>
            <input @keyup='${this.submit_create_if_enter}' id='subreddit'>
            <label for='launch_name'>Launch name</label>
            <input @keyup='${this.submit_create_if_enter}' id='launch_name'>
            <button @click='${this.submit_create}'>Create thread</button>
            <div id='creation_error'></div>
          `;
        } else {
          '';
        }
      }}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();

    // We want to be sure that the input element is present,
    // so let's await the initial rendering.
    await this.updateComplete;
    this.shadowRoot.querySelector('input').focus();
  }

  // Continue an existing thread.

  _submit_continue_if_enter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      return this._submit_continue();
    }
  }

  _get_thread_data() {
    const id = this.shadowRoot.querySelector('#thread_id').value |> Number;

    // Reject early if possible to avoid server call.
    if (!Number.isInteger(id) || id < 1) {
      this.shadowRoot.getElementById('continuation_error').innerHTML = 'Thread not found.';
      return Promise.reject();
    }

    return get_thread_data(id)
      .catch(err => {
        this.shadowRoot.getElementById('continuation_error').innerHTML = 'Thread not found.';
        return Promise.reject(err);
      });
  }

  async _submit_continue() {
    // FIXME Use the pipeline operator for readability once babel/babel-eslint#765 is resolved.
    const id = await initialize(await this._get_thread_data());
    const url = new URL(window.location.href);
    url.searchParams.set('thread_id', id);
    window.history.replaceState(undefined, '', url);
    this.remove();
  }

  // Create a new thread.

  submit_create_if_enter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      return this.submit_create();
    }
  }

  submit_create() {
    const thread_name = this.shadowRoot.getElementById('thread_title').value;
    let subreddit = this.shadowRoot.getElementById('subreddit').value;
    const display_name = this.shadowRoot.getElementById('launch_name').value;

    if ([thread_name, display_name].includes('')) {
      this.shadowRoot.getElementById('creation_error').innerHTML
        = 'Thread and display names are required.';
      return Promise.reject();
    }

    if (!subreddit_regex.test(subreddit)) {
      this.shadowRoot.getElementById('creation_error').innerHTML = 'Invalid subreddit name';
      return Promise.reject();
    }

    subreddit = subreddit_regex.exec(subreddit)?.[1]?.toLowerCase() ?? null;

    return esfetch(`${vars.server_url}/v1/thread?features=space,spacex`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('api_jwt')}`,
        },
      })
      .post({
        thread_name,
        display_name,
        subreddit,
        event_column_headers: ['UTC', 'Countdown', 'Update'],
      })
      .then(initialize)
      .then(id => {
        const url = new URL(window.location.href);
        url.searchParams.set('thread_id', id);
        window.history.replaceState(undefined, '', url);
        this.remove();
      })
      .catch(err => {
        console.error(err);
        this.shadowRoot.getElementById('creation_error').innerHTML = err.message;
        return err;
      });
  }
}
