module.exports = function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path, { opts }) {
        // Ensure we're a subclass of a designated superclass (which also has decorators).
        if (!(
          path.node.superClass
          && opts.superClasses
          && opts.superClasses.includes(path.node.superClass.name))
          || path.node.decorators === undefined
        ) {
          return;
        }

        // Convert the decorators to statements.
        const attributes = path.node.decorators
          .filter(dec => dec.expression.callee.name === "Attr")
          .map(dec => dec.expression.arguments)
          .map(attr => {
            if (![1, 2].includes(attr.length)) {
              throw new Error("@Attr decorators must contain one or two parameters.");
            }

            const [key, value = t.stringLiteral("")] = attr;
            return t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier("this"),
                  t.identifier("setAttribute")
                ),
                [key, value]
              )
            );
          });

        // There are no matching attributes; return to avoid potentially creating a constructor.
        if (attributes.length === 0) {
          return;
        }

        // Remove the decorators.
        path
          .get("decorators")
          .filter(path => path.node.expression.callee.name === "Attr")
          .forEach(attr => attr.remove());

        const constructor = path.get('body.body').find(method => method.node.kind === "constructor");
        if (constructor) {
          // We already have a constructor; prepend the attributes.
          attributes.reverse();
          const body = constructor.get('body');
          attributes.forEach(attr => body.unshiftContainer('body', attr));
        } else {
          // A constructor doesn't exist, create one and place the attributes in the body.
          const method = t.classMethod(
            "constructor",
            t.identifier("constructor"),
            [],
            t.blockStatement(attributes),
          );
          method.body.body.unshift(t.expressionStatement(t.callExpression(t.identifier('super'), [])));

          path
            .get("body")
            .unshiftContainer(
              "body",
              method,
            );
        }
      }
    }
  };
};
