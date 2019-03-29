import { property as orig_property, Constructor, LitElement } from 'lit-element';
export { customElement } from 'lit-element';
export { sealed, frozen } from '@jhpratt/decorators';

export const property = orig_property({ attribute: false });

export function attribute(
  _attr: string,
  value: string = '',
): (constructor: Constructor<LitElement>) => any {
  return (constructor: Constructor<LitElement>) =>
    class extends constructor {
      // @ts-ignore Not sure why this is throwing an error, it's absolutely correct.
      @orig_property({ reflect: true }) public [_attr] = value;
    };
}
