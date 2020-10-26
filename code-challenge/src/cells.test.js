import block from './data/block.js'
import { Cells } from './cells.js'
import test from 'tape'

test('Cells - basic functionality', (t) => {
  const cells = new Cells(block)
  t.deepEqual(block.data, cells.data)
  t.deepEqual(block.xCount, cells.xCount)
  t.deepEqual(block.yCount, cells.yCount)
  t.equal(cells.get(0, 0), 0)
  t.equal(cells.get(3, 3), 0)
  t.equal(cells.get(1, 1), 1)
  t.equal(cells.get(-1, -1), -1)
  cells.set({ x: 1, y: 0, newValue: 1 })
  t.equal(cells.get(1, 0), 1)
  t.end()
})

test('Cells - toString', (t) => {
  const cells = new Cells(block)
  const str = cells.toString()
  const expected = `
0000
0110
0110
0000
`.trim()
  t.equal(str, expected, 'toString')
  t.end()
})

test('Cells - getNeighbors', (t) => {
  const cells = new Cells(block)
  const neighbors = cells.getNeighbors(1, 1)
  t.equals(neighbors.length, 8)
  t.deepEquals(neighbors, [0, 0, 0, 0, 1, 0, 1, 1])
  t.end()
})

test('Cells - countNeighbors', (t) => {
  const cells = new Cells(block)
  t.deepEqual(cells.countNeighbors(0, 0), { alive: 1, dead: 2 })
  t.deepEqual(cells.countNeighbors(2, 2), { alive: 3, dead: 5 })
  t.deepEqual(cells.countNeighbors(3, 3), { alive: 1, dead: 2 })
  t.end()
})

test('Cells - wrapped', (t) => {
  const args = { ...block, wrap: true }
  const cells = new Cells(args)
  t.true(cells.wrap, 'wrap = true')
  t.equal(cells.get(-1, -1), 0)
  t.deepEqual(cells.countNeighbors(0, 0), { alive: 1, dead: 7 })
  t.deepEqual(cells.countNeighbors(3, 3), { alive: 1, dead: 7 })
  t.end()
})
