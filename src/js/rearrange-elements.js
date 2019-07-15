/**
 * @template T
 * @param {T[]} a1
 * @param {T[]} a2
 * @returns {T[]}
 */
function find_lcs(arr1, arr2) {
  /** @type {T[]} */
  const common_start = [];
  for (let i = 0; arr1[i] === arr2[i] && arr1[i] !== undefined; i++) {
    common_start.push(arr1[i]);
  }

  /** @type {T[]} */
  const common_end = [];
  for (let i = arr1.length, j = arr2.length; arr1[--i] === arr2[--j] && arr1[i] !== undefined;) {
    common_end.unshift(arr1[i]);
  }

  // Eliminate the common start and end,
  // reducing the size of the matrix.
  const slice1 = arr1.slice(common_start.length, arr1.length - common_end.length);
  const slice2 = arr2.slice(common_start.length, arr2.length - common_end.length);

  /**
   * @type {number[]}
   */
  // Init LCS matrix.
  const matrix = new Array(slice1.length * slice2.length).fill(0);

  // Fill rest of the column that correspond to each of two arrays.
  for (let row = 1; row <= slice2.length; row++) {
    for (let col = 1; col <= slice1.length; col++) {
      if (slice1[col - 1] === slice2[row - 1]) {
        matrix[row + col * slice1.length] = matrix[row - 1 + (col - 1) * slice1.length] + 1;
      } else {
        matrix[row + col * slice1.length] = Math.max(
          matrix[row - 1 + col * slice1.length],
          matrix[row + (col - 1) * slice1.length],
        );
      }
    }
  }

  // If the length of the LCS is zero then return, skipping the backtracking.
  if (matrix[matrix.length - 1] === 0) {
    return [...common_start, ...common_end];
  }

  /** @type {T[]} */
  const lcs = [];
  let col = slice1.length;
  let row = slice2.length;

  while (row > 0 && col > 0) {
    if (slice1[col - 1] === slice2[row - 1]) {
      // Move by diagonal left-top.
      lcs.unshift(slice1[--col]);
      row--;
    } else if (matrix[row + col * slice1.length] === matrix[row + (col - 1) * slice1.length]) {
      // Move left.
      col--;
    } else {
      // Move up.
      row--;
    }
  }

  return [...common_start, ...lcs, ...common_end];
}

/**
 * @param {Element} parent Parent element of all nodes in `from` and `to`.
 * @param {Element[]} to All nodes that will be present on the parent after running this
 *   method. The nodes will be dynamically inserted, deleted, or replaced on
 *   the parent.
 */
export function mutate(parent, to) {
  const from = [...parent.children];
  const lcs = find_lcs(from, to);
  const lcs_set = new Set(lcs);

  // Mutate the existing children into the LCS.
  from.forEach(el => {
    if (!lcs_set.has(el)) {
      el.remove();
    }
  });

  if (lcs.length === 0) {
    parent.append(...to);
  }

  let lcs_index = 0;
  let to_index = 0;

  while (lcs_index < lcs.length && to_index < to.length) {
    if (lcs[lcs_index] === to[to_index]) {
      lcs_index++;
      to_index++;
    } else {
      lcs[lcs_index].before(to[to_index++]);
    }
  }

  parent.append(...to.slice(to_index - 1));
}
