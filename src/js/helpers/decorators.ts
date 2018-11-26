import { property } from '@polymer/lit-element';

export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
}

export function role(role: string) {
  return function<T extends { new(...args: any[]): {}}>(constructor: T) {
    // TypeScript doesn't let us return this immediately
    class _ extends constructor {
      @property({ reflect: true }) role = role;
    };
    return _;
  };
}
