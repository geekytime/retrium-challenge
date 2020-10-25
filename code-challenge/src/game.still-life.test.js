import beeHive from './data/bee-hive.js'
import block from './data/block.js'
import loaf from './data/loaf.js'
import { Cells } from './cells.js'
import { tick } from './game.js'
import test from 'tape'

const assertStillLife = ({ cells, ticks, t }) => {
  const next = tick({ cells })
  t.ok(next.isMatch(cells), `ticks left: ${ticks}`)
  if (ticks > 0) {
    assertStillLife({ cells: next, ticks: ticks - 1, t })
  }
}

test('tick - still life - block', (t) => {
  const cells = new Cells(block)
  assertStillLife({ cells, ticks: 10, t })
  t.end()
})

test('tick - still life - beeHive', (t) => {
  const cells = new Cells(beeHive)
  assertStillLife({ cells, ticks: 10, t })
  t.end()
})

test('tick - still life - loaf', (t) => {
  const cells = new Cells(loaf)
  assertStillLife({ cells, ticks: 10, t })
  t.end()
})
