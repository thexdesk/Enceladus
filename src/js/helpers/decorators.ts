import { property } from '@polymer/lit-element';

// tslint:disable-next-line ban-types
export function sealed(constructor: Function): void {
  Object.seal(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
}

// tslint:disable-next-line typedef
export function role(_role: string) {
  return <T extends { new(...args: any[]): {}}>(constructor: T) => {
    // TypeScript doesn't let us return this immediately
    class Extended extends constructor {
      @property({ reflect: true }) public role = _role;
    }
    return Extended;
  };
}
