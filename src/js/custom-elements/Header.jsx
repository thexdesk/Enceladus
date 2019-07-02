import styles from 'css/components/Header';
import { Countdown } from './Countdown';

@Attr('role', 'region')
export class Header extends CustomElement {
  static html = <>
    <style>{styles}</style>
    <div role='header' aria-description='launch name'>{this.display_name}</div>
    <Countdown prop:t0={this.t0} />
  </>;

  @Derive(get, set)
  #display_name = '';

  @Derive(get, set)
  #t0 = null;
}
