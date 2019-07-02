import styles from 'css/components/modal';
import { video_elem } from 'js/elements';
import esfetch from 'https://unsafe-production.jspm.io/npm:esfetch@0.1.2/index.js';
import { server_url } from 'js/variable-declarations';

@Attr('role', 'dialog')
@Attr('aria-modal')
export class VideoModal extends CustomElement {
  static html = <>
    <style>{styles}</style>
    <div class='modal'>
      <label>
        Enter the link to a video embed.
        <br/>
        Leave empty to unset.

        <input on:keyup={this.#submit.bind(this)} />
      </label>

      <div>
        <button on:click={() => this.hidden = true}>Cancel</button>
        <button on:click={this.#submit.bind(this)}>Set Video</button>
      </div>
    </div>
  </>;

  connectedCallback() {
    this.shadowRoot.querySelector('input').focus();
  }

  async #submit(e) {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') {
      return;
    }

    video_elem.video_id = this.shadowRoot.querySelector('input').value;

    try {
      const thread_id = new URL(window.location.href).searchParams.get('thread_id');
      await esfetch(
        `${server_url}/v1/thread/${thread_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('api_jwt')}`,
          },
        })
        .patch({ video_id: video_elem.video_id });
      this.hidden = true;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
}
