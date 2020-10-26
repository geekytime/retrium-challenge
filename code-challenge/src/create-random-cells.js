import { Cells } from './cells.js'
import { Chance } from 'chance'

const createArray = ({ length, func }) => {
  return Array.from(Array(length)).map(func)
}

export const createRandomCells = ({
  seed = undefined,
  xCount = 32,
  yCount = 32,
  wrap = false
} = {}) => {
  const chance = new Chance()

  const randomCell = () => {
    return chance.integer({ min: 0, max: 1 })
  }

  const length = xCount * yCount
  const data = createArray({ length, func: randomCell })
  return new Cells({
    data,
    xCount,
    yCount,
    wrap
  })
}
