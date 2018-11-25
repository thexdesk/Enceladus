export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(Object.getPrototypeOf(constructor));
}
