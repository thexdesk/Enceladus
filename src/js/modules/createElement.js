export default function createElement(tag, attributes, ...children) {
  const root = document.createElement(tag);

  Object.entries(attributes ?? {}).forEach(([attribute, value]) => {
    root.setAttribute(attribute, value);
  });

  children.forEach(val => root.appendChild(do {
    if (val instanceof Node) {
      val;
    } else if (typeof val === 'string') {
      new Text(val);
    } else {
      // eslint-disable-next-line no-console
      console.error('Unknown element', val);
    }
  }));

  return root;
}
