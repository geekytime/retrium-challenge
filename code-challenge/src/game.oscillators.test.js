import beacon0 from './data/beacon-0.js'
import beacon1 from './data/beacon-1.js'
import blinker0 from './data/blinker-0.js'
import blinker1 from './data/blinker-1.js'
import { Cells } from './cells.js'
import pulsar0 from './data/pulsar-0.js'
import pulsar1 from './data/pulsar-1.js'
import pulsar2 from './data/pulsar-2.js'
import { tick } from './game.js'
import test from 'tape'
import toad0 from './data/toad-0.js'
import toad1 from './data/toad-1.js'

const assertOscillator = ({ allCells, currentTick = 0, maxTicks = 10, t }) => {
  const nextTick = currentTick + 1
  const period = allCells.length
  const cellsIndex = currentTick % period
  const cells = allCells[cellsIndex]
  const nextCellsIndex = (nextTick) % period
  const expectedNextCells = allCells[nextCellsIndex]
  const nextCells = tick({ cells })
  t.ok(nextCells.isMatch(expectedNextCells), `current tick: ${currentTick}`)
  if (currentTick < maxTicks) {
    assertOscillator({ allCells, currentTick: nextTick, maxTicks, t })
  }
}

test('tick - oscillator - blinker', (t) => {
  const allCells = [
    new Cells(blinker0),
    new Cells(blinker1)
  ]
  assertOscillator({ allCells, t })
  t.end()
})

test('tick - oscillator - toad', (t) => {
  const allCells = [
    new Cells(toad0),
    new Cells(toad1)
  ]
  assertOscillator({ allCells, t })
  t.end()
})

test('tick - oscillator - beacon', (t) => {
  const allCells = [
    new Cells(beacon0),
    new Cells(beacon1)
  ]
  assertOscillator({ allCells, t })
  t.end()
})

test('tick - oscillator - pulsar', (t) => {
  const allCells = [
    new Cells(pulsar0),
    new Cells(pulsar1),
    new Cells(pulsar2)
  ]
  assertOscillator({ allCells, t })
  t.end()
})
