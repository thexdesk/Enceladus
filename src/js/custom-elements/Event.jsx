import marked from 'https://unsafe-production.jspm.io/npm:marked@0.6.3';

@ShadowRoot(false)
export class Event extends CustomElement {
  @Derive(get, set)
  #posted = false;

  @Derive(get, set)
  #cols = [];

  static html = <>
    <tr bool:hidden={!this.posted}>
      <td>{
        new Date(this.cols[0] * 1_000)
          .toLocaleString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
          })
      }</td>
      <td>{this.cols[1]}</td>
      <td prop:innerHTML={this.cols[2] |> marked} />
    </tr>
  </>;
}
