/**
 * @param parent Parent element of all nodes in `from` and `to`.
 * @param from The existing nodes in the parent. It could likely be fetched
 *   from the parent, but is trivial to maintain the references manually in
 *   our use case.
 * @param to All nodes that will be present on the parent after running this
 *   method. The nodes will be dynamically inserted, deleted, or replaced on
 *   the parent.
 */
export function mutate(parent, from, to) {
  const x_size = from.length + 1;
  const y_size = to.length + 1;

  // Generate a Levenshtein matrix.
  const matrix = [];

  // Handle empty case.
  if (from.length === 0) {
    parent.append(...to);
  }

  for (let cur_y = 0; cur_y < y_size; ++cur_y) {
    // Initialize the first column.
    matrix[cur_y * x_size] = cur_y;

    // Calculate the value for every other cell.
    for (let cur_x = 1; cur_x < x_size; ++cur_x) {
      matrix[cur_x + cur_y * x_size] = do {
        if (cur_y === 0) {
          // Initialize the first row.
          cur_x;
        } else if (from[cur_x - 1] === to[cur_y - 1]) {
          // No change on diagonal, use that value.
          matrix[cur_x - 1 + (cur_y - 1) * x_size];
        } else {
          // Something has changed, find which direction is best.
          Math.min(
            matrix[cur_x - 1 + cur_y * x_size],
            matrix[cur_x + (cur_y - 1) * x_size],
            matrix[cur_x - 1 + (cur_y - 1) * x_size],
          ) + 1;
        }
      };
    }
  }

  let cur_x = x_size - 1;
  let cur_y = y_size - 1;
  let current;

  // Begin getting the operations by walking balkwards.
  while (current = matrix[cur_x + cur_y * x_size]) {
    const up = matrix[cur_x + (cur_y - 1) * x_size];
    const left = matrix[cur_x - 1 + cur_y * x_size];
    const diag = matrix[cur_x - 1 + (cur_y - 1) * x_size];

    // Filtering undefined lets us avoid special cases when cur_x or cur_y is zero.
    const min = Math.min(...[up, left, diag].filter(v => v !== undefined));

    // Find the element to insert after, if any. Only used when inserting.
    const insert_after = from[cur_x - 1];

    // Apply the appropriate operation.
    if (min === diag) {
      --cur_x;
      --cur_y;
      if (diag === current - 1) {
        // Replace
        from[cur_x].replaceWith(to[cur_y]);
      }
    } else if (min === left) {
      // Remove
      from[--cur_x].remove();
    } else if (insert_after) {
      // Insert after
      insert_after.after(to[--cur_y]);
    } else {
      // Insert before
      // We can't insert after "nothing", so insert at the beginning.
      from[0].before(to[--cur_y]);
    }
  }
}
