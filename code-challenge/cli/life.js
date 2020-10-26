import { createRandomCells } from '../src/create-random-cells.js'
import { terminal } from 'terminal-kit'
import { tick } from '../src/game.js'

const fps = process.env.LIFE_FPS || 30
const speed = 1000 / fps
const seed = process.env.LIFE_SEED || Math.random()
const wrap = process.env.LIFE_WRAP === 'true'
const xCount = process.env.LIFE_X_COUNT || 160
const yCount = process.env.LIFE_Y_COUNT || 45

const seedCells = createRandomCells({ seed, wrap, xCount, yCount })
terminal.clear()

const render = ({ cells }) => {
  terminal.bgBlack().eraseArea(cells.xCount, cells.yCount)
  terminal.moveTo(1, 1)
  cells.data.forEach((cell, index) => {
    if (cell === 1) {
      terminal.bgGreen(' ')
    } else {
      terminal.bgBlack(' ')
    }
    if (index % cells.xCount === 0) {
      terminal.black('\n')
    }
  })

  setTimeout(() => {
    const nextCells = tick({ cells })
    render({ cells: nextCells })
  }, speed)
}

render({ cells: seedCells })
