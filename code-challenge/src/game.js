const defaultRules = {
  b: [3],
  s: [2, 3]
}

export const tick = ({ cells, rules = defaultRules }) => {
  const nextCells = cells.clone()
  for (let y = 0; y < cells.yCount; y++) {
    for (let x = 0; x < cells.xCount; x++) {
      const value = cells.get(x, y)
      const newValue = tickCell({ cells, x, y, rules })
      nextCells.set({ x, y, value, newValue })
    }
  }
  return nextCells
}

const tickCell = ({ cells, x, y, rules }) => {
  const isAlive = cells.isAlive(x, y)
  const neighbors = cells.countNeighbors(x, y)

  if (isAlive) {
    if (rules.s.includes(neighbors.alive)) {
      return 1
    }
    return 0
  }

  if (rules.b.includes(neighbors.alive)) {
    return 1
  }
  return 0
}
