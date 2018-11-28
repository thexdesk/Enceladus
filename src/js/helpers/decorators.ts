import { property as orig_property, Constructor, LitElement } from '@polymer/lit-element';
export { customElement } from '@polymer/lit-element';

export function sealed(constructor: Constructor<HTMLElement>): any {
  Object.seal<typeof constructor>(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
  return constructor;
}

export const attribute = orig_property({ reflect: true });
export const property = orig_property({ attribute: false });

export function role(
  _role: string,
): (constructor: Constructor<LitElement>) => any {
  return (constructor: Constructor<LitElement>) => {
    // TypeScript doesn't let us return this immediately
    class Extended extends constructor {
      @attribute public role = _role;
    }
    return Extended;
  };
}
