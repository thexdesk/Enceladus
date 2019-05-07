class Statements {
  constructor(statements, ident) {
    this.statements = statements;
    this.ident = ident;
  }
}

module.exports = function (babel) {
  const { types: t, template } = babel;

  const raw_fragment = template`document.createDocumentFragment();`;
  const create_fragment = template`const IDENT = document.createDocumentFragment();`;
  const create_element = template`const IDENT = document.createElement(ELEM);`;
  const create_text_node = template`document.createTextNode(VALUE);`;
  const set_attribute = template`ELEM.setAttribute(NAME, VALUE);`;
  const append_child = template`IDENT.append_child(CHILD);`;
  const return_val = template`return VALUE;`;

  function convert_fragment(path) {
    const { node } = path;
    const children = node.children.filter(child => { return !t.isJSXText(child) || !child.value.trim() === "" });

    if (children.length === 0) {
      return raw_fragment();
    }

    const ident = path.scope.generateUidIdentifier('frag');
    const statements = [];

    statements.push(create_fragment({ IDENT: ident }));

    // Append children
    path.get('children')
      .filter(child => !t.isJSXText(child.node) || child.node.value.trim() !== "")
      .map(convert_element)
      .filter(child => child != null)
      .forEach(child => {
        if (Array.isArray(child.statements)) {
          // Slice to remove the return statement.
          statements.push(...child.statements.slice(0, -1));
          statements.push(append_child({ IDENT: ident, CHILD: child.ident }));
        } else {
          statements.push(append_child({ IDENT: ident, CHILD: child.expression }))
        }
      });

    statements.push(return_val({ VALUE: ident }));
    return new Statements(statements, ident);
  }

  function convert_element(path) {
    const { node } = path;
    if (node === undefined) {
      return;
    }

    if (t.isJSXText(node)) {
      const value = node.value.trim();
      return value === "" ? null : create_text_node({ VALUE: t.stringLiteral(value) });
    }

    let statements = [];
    let {
      openingElement: {
        name: { name },
        attributes
      }
    } = node;

    const ident = path.scope.generateUidIdentifier(name);

    // Create element.
    statements.push(create_element({ IDENT: ident, ELEM: t.stringLiteral(name) }));

    // Set all attributes.
    attributes.forEach(({ name: { name }, value }) => {
      if (value === null) {
        value = t.stringLiteral('');
      }
      statements.push(set_attribute({ ELEM: ident, NAME: t.stringLiteral(name), VALUE: value }));
    });

    // Append children
    path.get('children')
      .filter(child => !t.isJSXText(child.node) || child.node.value.trim() !== "")
      .map(convert_element)
      .filter(child => child != null)
      .forEach(child => {
        if (Array.isArray(child.statements)) {
          // Slice to remove the return statement.
          statements.push(...child.statements.slice(0, -1));
          statements.push(append_child({ IDENT: ident, CHILD: child.ident }));
        } else {
          statements.push(append_child({ IDENT: ident, CHILD: child.expression }))
        }
      });

    statements.push(return_val({ VALUE: ident }));
    return new Statements(statements, ident);
  }

  return {
    name: "jsx-transformer",
    inherits: require("@babel/plugin-syntax-jsx").default,
    visitor: {
      JSXFragment(path) {
        path.replaceWithMultiple(convert_fragment(path).statements);
      },

      JSXElement(path) {
        path.replaceWithMultiple(convert_element(path).statements);
      },
    }
  };
}
