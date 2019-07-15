import styles from 'css/components/Links';
import { video_modal } from 'js/elements';
import { is_host } from 'js/helpers';

@Attr('role', 'navigation')
export class Links extends CustomElement {
  static html = <>
    <style>{styles}</style>

    <a
      static:if={is_host()}
      class='youtube'
      on:click={() => youtube_modal.hidden = false}
    />

    <a
      class='reddit'
      target='_blank'
      rel='noopener'
      aria-description='reddit thread'
      bool:hidden={this.post_id === null}
      attr:href={do {
        if (this.post_id === null) '';
        else `https://reddit.com/${this.post_id}`;
      }}
    />

    <a
      class='patreon'
      target='_blank'
      rel='noopener'
      aria-description='Patreon'
      href='https://patreon.com/EnceladusLTI'
    />

    <a
      class='github'
      target='_blank'
      rel='noopener'
      aria-description='source code'
      href='https://github.com/r-spacex/Enceladus-LTI'
    />
  </>;

  @Derive(get, set)
  #post_id = null;
}
