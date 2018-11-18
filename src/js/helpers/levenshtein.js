/**
 * @template T
 * @param {T[]} top
 * @param {T[]} side
 * @returns {number[][]}
 */
export function levenshtein_matrix(top, side) {
  /**
   * TODO
   * How much of a performance gain is there by using u16 bit arrays?
   * If not significant, it may be worth it to use regular arrays.
   * Adding typed-matrix as a dependency adds 1.1 kB to the size of the bundle,
   * and will inherently cause slower parsing and JITting.
   */
  // const matrix = new Uint16Matrix(top.length + 1, side.length + 1);
  const matrix = new Array(side.length + 1);
  for (let y = 0; y < side.length + 1; ++y) {
    matrix[y] = new Array(top.length + 1);
  }

  // initialize first column
  for (let y = 0; y <= side.length; ++y) {
    matrix[y][0] = y;
  }

  // initialize first row
  for (let x = 1; x <= top.length; ++x) {
    matrix[0][x] = x;
  }

  // Fill in the rest of the matrix
  for (let y = 1; y <= side.length; ++y) {
    for (let x = 1; x <= top.length; ++x) {
      matrix[y][x] = Math.min(
        matrix[y - 1][x - 1] + (top[x - 1] !== side[y - 1]), // replacement
        matrix[y][x - 1] + 1, // deletion
        matrix[y - 1][x] + 1, // insertion
      );
    }
  }

  return matrix;
}

/**
 * @typedef {'insert' | 'delete' | 'replace'} operation
 * @template T
 * @param {number[][]} matrix
 * @param {T[]} top
 * @param {T[]} side
 * @returns {{ op: operation<_>, loc: [number, number], val: T }}
 */
export function operations(matrix, top, side) {
  const current = Object.seal({
    row: side.length - 1,
    col: top.length - 1,
    get cell() {
      return matrix[this.row][this.col];
    },
  });

  const ops = [];

  while (current.cell !== 0) {
    // we've reached an edge,
    // there's only one way to move
    if (current.col === 0) {
      ops.push({
        op: 'insert',
        loc: [current.row, current.col],
        val: side[current.row - 1],
      });
      --current.row;
      continue;
    }
    if (current.row === 0) {
      ops.push({
        op: 'delete',
        loc: [current.row, current.col],
        val: top[current.col - 1],
      });
      --current.col;
      continue;
    }

    const diagonal = matrix[current.row - 1][current.col - 1];
    const left = matrix[current.row - 1][current.col];
    const above = matrix[current.row][current.col - 1];

    if (diagonal <= left && diagonal <= above && current.cell - diagonal <= 1) {
      if (current.cell !== diagonal) {
        ops.push({
          op: 'replace',
          loc: [current.row, current.col],
          val: side[current.row - 1], // new value, not current
        });
      }
      --current.row;
      --current.col;
    } else if (left <= above && current.cell - left === 1) {
      ops.push({
        op: 'delete',
        loc: [current.row, current.col],
        val: top[current.col - 1],
      });
      --current.col;
    } else {
      ops.push({
        op: 'insert',
        loc: [current.row, current.col],
        val: side[current.row - 1],
      });
      --current.row;
    }
  }

  ops.reverse();

  return ops;
}


const top = ['C', 'B', 'Z', 'G', 'C', 'T', 'A', 'G'];
const side = ['D', 'Z', 'U', 'X', 'G', 'A', 'T', 'G'];
const matrix = levenshtein_matrix(top, side);

console.log(matrix.toString());
console.log(operations(matrix, top, side));
