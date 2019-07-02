@ShadowRoot(false)
@Attr('role', 'complementary region')
export class Twitter extends CustomElement {
  static html = <>
    <header>TWITTER</header>
    <a
      class='twitter-timeline'
      data-link-color='#ff5100'
      data-dnt='true'
      data-theme='dark'
      data-chrome='noheader nofooter noborders noscrollbar transparent'
      href='https://twitter.com/EnceladusLTI/lists/enceladus-lti'
    />
  </>;
}
