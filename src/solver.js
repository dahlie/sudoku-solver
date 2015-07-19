import _ from 'lodash'

// Cross product of elements in a and b
function cross(a, b) { return [for (i of a) for (j of b) i + j] }

// Constants
const digits = '123456789'
const rows = 'ABCDEFGHI'
const cols = digits
const emptyChars = '.0'
const validChars = digits + emptyChars

// All possible squares
const squares = cross(rows, cols)

// Combinations of all possible units
const unitList = _.flatten([
  [ for (c of cols) cross(rows, [c]) ],
  [ for (r of rows) cross([r], cols) ],
  [ for (rs of _.chunk(rows, 3)) for (cs of _.chunk(cols, 3)) cross(rs, cs) ]
])

// Units per square
const units = new Map([for (s of squares) [s, [for (u of unitList) if (u.includes(s)) u]]])

// Peers per square
const peers = new Map([for (s of squares) [s, [...new Set([for (u of _.flatten(units.get(s))) if (u != s) u])]]])

function isValidChar(c) { return validChars.includes(c) }

function contains(str, c) { return str.indexOf(c) >= 0 }

function isEmpty(str) { return str.length == 0 }

function hasOne(str) { return str.length == 1 }

function hasMany(str) { return str.length > 1 }

function assertNotEmpty(str, msg) { if (isEmpty(str)) throw msg }

function parse(s) {
  // Replace '.'s with null value and return an object containing hints with null values removed
  let values = [for (c of s.split('')) if (isValidChar(c)) '.0'.includes(c) ? null : c]
  return new Map([for (p of _.zip(squares, values)) if (p[1]) p])
}

function eliminate(grid, square, value) {
  // Check if value is already eliminated
  if (!grid.get(square).includes(value)) return grid

  // Eliminate value from a square
  let values = grid.get(square).replace(value, '')
  grid.set(square, values)

  // Contradiction: removed last value
  if (isEmpty(values)) {
    return null
  }

  // (1) If a square is reduced to one value, then eliminate that value from peers
  else if (hasOne(values)) {
    for (let peer of peers.get(square)) {
      if (!eliminate(grid, peer, values)) {
        return null
      }
    }
  }

  // (2) If a unit is reduced to only one place for a value, then put it there
  for (let unit of units.get(square)) {
    let possiblePlaces = [for (u of unit) if (contains(grid.get(u), value)) u]

    if (hasOne(possiblePlaces)) {
      if (!assign(grid, possiblePlaces[0], value)) {
        return null
      }
    }
  }

  return grid
}

// Assign a given value for a square
function assign(grid, square, value) {
  for (let val of _.without(grid.get(square), value)) {
    if (!eliminate(grid, square, val)) {
      return null
    }
  }

  return grid
}

// Using depth-first search and propagation, try all possible values
function search(grid) {
  // Failed?
  if (!grid) return null

  // Solved?
  if ([...grid.values()].every(hasOne)) return grid

  // Choose unfilled square with the fewest possibilities
  let unsolved = [...grid.entries()].filter((e) => hasMany(e[1]))
  let [square, values] = unsolved.sort((a, b) => a[1].length - b[1].length)[0]

  for (let value of values) {
    let solution = search(assign(new Map(grid), square, value))

    if (solution) {
      return solution
    }
  }

  return null
}

function solve(sudoku) {
  // Initialize every square with every possible number
  let grid = new Map([for (s of squares) [s, digits]])

  // Assign numbers from parsed sudoku
  sudoku.forEach((value, key) => assign(grid, key, value))

  return search(grid)
}

export default { cross, units, peers, parse, solve }
