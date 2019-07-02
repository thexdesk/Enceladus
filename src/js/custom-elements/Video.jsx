import styles from 'css/components/Video';

@Attr('role', 'region')
export class Video extends CustomElement {
  static html = <>
    <style>{styles}</style>
    <iframe
      title='video'
      attr:src={this.video_url ?? ''}
      bool:hidden={this.video_url === null}
    />
  </>;

  @Derive(get, set)
  #video_url = null;
}
