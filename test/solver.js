import { assert } from 'chai'
import sudokus from './test-sudokus'

import solver from '../src/js/solver'

describe('helpers', () => {
  describe('cross', () => {
    it('should generate cross product of elements in given arrays', () => {
      const result = solver.cross(['A', 'B'], ['1', '2'])
      assert.equal(4, result.length)
    })
  })

  describe('units', () => {
    it('should return collection of peers for the square', () => {
      const result = solver.units.get('C2')
      const expected = [['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'], // column
                        ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], // row
                        ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']] // box

      assert.deepEqual(result, expected)
    })
  })

  describe('peers', () => {
    it('should generate an array of squares peers', () => {
      const result = solver.peers.get('C2')
      const expected = ['A2', 'B2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', // column
                        'C1', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', // row
                        'A1', 'A3', 'B1', 'B3']                         // box

      assert.deepEqual(result, expected)
    })
  })
})

function assertSolution(solution) {
  assert.isTrue([...solution.values()].every((element) => element.length == 1)) }

describe('solver', () => {
  it('should solve all easy sudokus', () => {
    sudokus.easy.forEach((s) => { assertSolution(solver.solve(solver.parse(s))) })
  })

  it('should solve all hard sudokus', () => {
    sudokus.hard.forEach((s) => { assertSolution(solver.solve(solver.parse(s))) })
  })

  it('should solve even the hardest sudokus', () => {
    sudokus.hardest.forEach((s) => { assertSolution(solver.solve(solver.parse(s))) })
  })
})
