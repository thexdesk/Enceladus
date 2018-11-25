export default function createElement(
  tag: string | symbol,
  attributes: { [key: string]: string },
  ...children: Array<DocumentFragment | HTMLElement | string>
): DocumentFragment | HTMLElement {
  let root: DocumentFragment | HTMLElement;

  if (typeof tag === 'symbol') {
    root = document.createDocumentFragment();
  } else {
    root = document.createElement(tag);

    Object.entries(attributes || {}).forEach(([attribute, value]) => {
      (root as HTMLElement).setAttribute(attribute, value);
    });
  }

  children.forEach(val => {
    if (val instanceof Node) {
      root.appendChild(val);
    } else if (typeof val === 'string') {
      root.appendChild(new Text(val));
    } else {
      console.error('Unknown element', val);
    }
  });

  return root;
}
