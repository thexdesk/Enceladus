export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
}

export function customElement(element_name: string) {
  return function(constructor: Function) {
    customElements.define(element_name, constructor);
  };
}

export function defaultAttribute(attribute: string, value: string) {
  return function<T extends {
    new (...args: any[]): {};
    connectedCallback?: Function;
    hasAttribute?: Function;
    setAttribute?: Function;
  }>(constructor: T) {
    return class extends constructor {
      connectedCallback = (function(this: T) {
        if (!this.hasAttribute!(attribute)) {
          this.setAttribute!(attribute, value);
        }

        const callback = this.connectedCallback;
        if (callback) {
          callback();
        }
      }).bind(this);
    };
  };
}
