function to_kebab(name) {
  return name.replace(/[a-z]([A-Z])+/g, m => `${m[0]}-${m.substring(1)}`).toLowerCase()
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path, { opts }) {
        if (!(path.node.superClass && opts && opts.superClasses.includes(path.node.superClass.name))) {
          return;
        }

        let class_name = to_kebab(path.node.id.name);
        if (!class_name.includes("-")) {
          class_name = `x-${class_name}`;
        }

        path.insertAfter(t.callExpression(
          t.memberExpression(
            t.memberExpression(
              t.identifier('window'),
              t.identifier('customElements')
            ),
            t.identifier('define')
          ),
          [
            t.stringLiteral(class_name),
            path.node.id,
          ]
        ));
      },
    }
  };
}
