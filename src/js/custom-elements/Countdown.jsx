import styles from 'css/components/Countdown';

function pad(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return String(n);
}

@Attr('role', 'timer')
@Attr('aria-description', 'countdown clock')
export class Countdown extends CustomElement {
  #interval = null;

  @Derive(get)
  #t0 = null;

  @Derive(get, set)
  #display_time = '';

  set t0(value) {
    this.#t0 = value;

    if (value === null) {
      clearInterval(this.#interval);
    } else if (this.#interval === null) {
      this.#interval = setInterval(this.#update_clock.bind(this), 1_000);
    }

    this.#update_clock();
  }

  static html = <>
    <style>{styles}</style>
    {this.display_time}
  </>;

  #update_clock() {
    if (this.t0 === null) {
      return;
    }

    const sign = do {
      if (this.t0 < Date.now() / 1000) {
        '+';
      } else {
        '-';
      }
    };

    const diff = this.t0 - Date.now() / 1000 |> Math.abs |> Math.floor;
    const hours = diff / 3600 |> Math.floor;
    const minutes = diff % 3600 / 60 |> Math.floor;
    const seconds = diff % 60;

    const display_time = do {
      if (this.t0 === null) {
        '';
      } else if (hours >= 48) {
        `T${sign}${hours / 24 |> Math.floor}d ${hours % 24}h`;
      } else if (hours >= 1) {
        `T${sign}${hours}:${minutes |> pad}:${seconds |> pad}`;
      } else {
        `T${sign}${minutes}:${seconds |> pad}`;
      }
    };

    // Avoid a DOM mutation if possible.
    if (display_time !== this.display_time) {
      this.display_time = display_time;
    }
  }

  disconnectedCallback() {
    if (this.#interval !== null) {
      clearInterval(this.#interval);
      this.#interval = null;
    }
  }
}
