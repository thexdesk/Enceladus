import { LitElement, html } from 'https://unsafe-production.jspm.io/lit-element@2.1.0';
import { youtube_elem } from '../../elements.js';
import esfetch from 'https://unsafe-production.jspm.io/npm:esfetch@0.1.2/index.js';
/* inline */ import vars from '../../helpers/variable-declarations.json';

const youtube_regex = /(?:(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?)?([a-zA-Z0-9_-]{11})/gu;

export class YoutubeModal extends LitElement {
  render() {
    return html`
      <link rel='stylesheet' href='./css/components/modal.css'>
      <div class='modal'>
        <label for='youtube_link'>
          Enter the link to a YouTube video.
          <br>Leave empty to unset.
        </label>
        <input
          @keyup='${this.submit}'
          pattern='${youtube_regex.source}'
          id='youtube_link'>

        <div>
          <button @click='${() => (this.hidden = true)}'>Cancel</button>
          <button @click='${this.submit}'>Set YouTube</button>
        </div>
      </div>
    `;
  }

  async connectedCallback() {
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', '');

    super.connectedCallback();

    // We want to be sure that the input element is present,
    // so let's await the initial rendering.
    await this.updateComplete;
    this.shadowRoot.querySelector('input').focus();
  }

  async submit(e) {
    const link_elem = this.shadowRoot.querySelector('input');

    if (e instanceof KeyboardEvent && e.key !== 'Enter' || !link_elem.validity.valid) {
      return;
    }

    youtube_elem.youtube_id = youtube_regex.exec(link_elem.value)[1] ?? null;

    try {
      const thread_id = new URL(window.location.href).searchParams.get('thread_id');
      await esfetch(
        `${vars.server_url}/v1/thread/${thread_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('api_jwt')}`,
          },
        })
        .patch({ youtube_id: youtube_elem.youtube_id });
      this.hidden = true;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
}
