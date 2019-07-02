// Browsers lacking support as of 2019-06-30: Edge, Opera.
// Not technically required, as those browsers aren't officially supported,
// but it's such a small polyfill it's worth the minimal effort.
if (!('fromEntries' in Object)) {
  Object.fromEntries = function(iterable) {
    return [...iterable]
      .reduce(
        (obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }),
        {}
      );
  };
}
