import { property as orig_property, Constructor, LitElement } from '@polymer/lit-element';
export { customElement } from '@polymer/lit-element';

export function sealed(constructor: Constructor<HTMLElement>): any {
  Object.seal<typeof constructor>(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
  return constructor;
}

export const property = orig_property({ attribute: false });

export function attribute(
  _attr: string,
  value: string,
): (constructor: Constructor<LitElement>) => any {
  return (constructor: Constructor<LitElement>) => {
    // TypeScript doesn't let us return this immediately
    // tslint:disable-next-line max-classes-per-file
    class Extended extends constructor {
      // @ts-ignore Not sure why this is throwing an error, it's absolutely correct.
      @orig_property({ reflect: true }) public [_attr] = value;
    }
    return Extended;
  };
}
