import { LitElement, html } from '@polymer/lit-element';
import { sealed, customElement, attribute } from '../helpers/decorators';
import { TemplateResult } from 'lit-html';
import { get_thread_data, initialize } from '../initialize';
import css from '../../css/inlined/x-modal.pcss';
import esfetch from 'esfetch';
import { server_url } from '../helpers/variable-declarations';

const subreddit_regex = /^\/?(?:r\/)?([a-zA-Z0-9_]{1,20})$/g;

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
        <div>Continuing an existing thread?</div>
        <label for='thread_id'>Enter a thread ID.</label>
        <input @keyup='${this.submit_continue_if_enter.bind(this)}' id='thread_id' type='number'>
        <button @click='${this.submit_continue.bind(this)}'>Launch!</button>
        <div id='continuation_error'></div>

        <hr>

        <div>Creating a new thread?</div>
        <label for='thread_title'>Thread title</label>
        <input @keyup='${this.submit_create_if_enter.bind(this)}' id='thread_title'>

        <label for='subreddit'>Subreddit</label>
        <input @keyup='${this.submit_create_if_enter.bind(this)}' id='subreddit'>

        <label for='launch_name'>Launch name</label>
        <input @keyup='${this.submit_create_if_enter.bind(this)}' id='launch_name'>

        <button @click='${this.submit_create.bind(this)}'>Create thread</button>
        <div id='creation_error'></div>
      </div>
    `;
  }

  public async connectedCallback(): Promise<void> {
    // we want to be sure that the input element is present,
    // so let's await the initial rendering
    await this.updateComplete;
    this.shadowRoot!.querySelector('input')!.focus();
  }

  // begin code for **continuing** an existing thread

  private submit_continue_if_enter(e: KeyboardEvent): Promise<void> | void {
    if (e.key === 'Enter') {
      return this.submit_continue();
    }
  }

  private get_thread_data(): Promise<APIThreadData<true>> {
    const id = Number(this.shadowRoot!.querySelector<HTMLInputElement>('#thread_id')!.value);

    // reject early if possible to avoid server call
    if (!Number.isInteger(id) || id < 1) {
      this.shadowRoot!.getElementById('continuation_error')!.innerHTML = 'Thread not found.';
      return Promise.reject();
    }

    return get_thread_data(id)
      .catch(err => {
        this.shadowRoot!.getElementById('continuation_error')!.innerHTML = 'Thread not found.';
        return Promise.reject(err);
      });
  }

  private async submit_continue(): Promise<void> {
    const id = await initialize(await this.get_thread_data());
    window.history.replaceState(undefined, '', `?thread_id=${id}`);
    this.remove();
  }

  // begin code for **creating** a new thread

  private submit_create_if_enter(e: KeyboardEvent): Promise<void> | void {
    if (e.key === 'Enter') {
      return this.submit_create();
    }
  }

  private submit_create(): Promise<void> {
    // tslint:disable-next-line max-line-length
    const thread_name = (this.shadowRoot!.getElementById('thread_title') as HTMLInputElement).value;
    let subreddit = (this.shadowRoot!.getElementById('subreddit') as HTMLInputElement).value;
    const launch_name = (this.shadowRoot!.getElementById('launch_name') as HTMLInputElement).value;

    if ([thread_name, subreddit, launch_name].includes('')) {
      this.shadowRoot!.getElementById('creation_error')!.innerHTML = 'All fields are required.';
      return Promise.reject();
    }

    if (!subreddit_regex.test(subreddit)) {
      this.shadowRoot!.getElementById('creation_error')!.innerHTML = 'Invalid subreddit name';
      return Promise.reject();
    }

    subreddit = subreddit_regex.exec(subreddit)![1];

    return esfetch(`${server_url}/v1/thread`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('api_jwt')}`,
        },
      })
      .post({
        thread_name,
        launch_name,
        subreddit,
      })
      .then(initialize)
      .then(id => {
        window.history.replaceState(undefined, '', `?thread_id=${id}`);
        this.remove();
      })
      .catch((err: Error) => {
        this.shadowRoot!.getElementById('creation_error')!.innerHTML = err.message;
      });
  }
}
