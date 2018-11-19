/**
 * @template T
 * @param {T[]} top
 * @param {T[]} side
 * @returns {[number[][], T[], T[]]}
 */
export function levenshtein_matrix(top, side) {
  const matrix = new Array(side.length + 1);
  matrix[0] = [...Array(top.length + 1).keys()];

  // Fill in the rest of the matrix
  for (let y = 1; y <= side.length; ++y) {
    matrix[y] = new Array(top.length + 1);
    matrix[y][0] = y;

    for (let x = 1; x <= top.length; ++x) {
      matrix[y][x] = Math.min(
        matrix[y - 1][x - 1] + (top[x - 1] !== side[y - 1]), // replacement
        matrix[y][x - 1] + 1, // deletion
        matrix[y - 1][x] + 1, // insertion
      );
    }
  }

  return [matrix, top, side];
}

/**
 * @typedef {'insert' | 'delete' | 'replace'} operation
 * @template T
 * @param {number[][]} matrix
 * @param {T[]} top
 * @param {T[]} side
 * @returns {{ op: operation<_>, loc: [number, number], val: T }}
 */
export function matrix_to_diff(matrix, top, side) {
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

console.log(
  matrix_to_diff(...levenshtein_matrix(top, side))
);
