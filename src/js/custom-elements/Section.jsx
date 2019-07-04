import styles from 'css/components/Section';
import marked from 'https://unsafe-production.jspm.io/npm:marked@0.6.3';

export class Section extends CustomElement {
  @Derive(get, set)
  #name = '';

  @Derive(get, set)
  #content = '';

  static html = <>
    <style>{styles}</style>

    <h1>{this.name}</h1>
    <ce:contents prop:innerHTML={this.content |> marked} />
  </>;
}
