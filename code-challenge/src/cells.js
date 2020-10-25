export class Cells {
  constructor ({ data, xCount, yCount, wrap = false }) {
    this.data = [...data]
    this.xCount = xCount
    this.yCount = yCount
    this.wrap = wrap
  }

  isAlive (x, y) {
    return (this.get(x, y) === 1)
  }

  isDead (x, y) {
    return (this.get(x, y) === 0)
  }

  get (x, y) {
    const index = this.getIndex(x, y)
    if (index >= 0 && index < this.data.length) {
      return this.data[index]
    }
    return -1
  }

  getIndex (x, y) {
    if (this.wrap) {
      return this.getIndexWrap(x, y)
    } else {
      return this.getIndexNoWrap(x, y)
    }
  }

  getIndexWrap (x, y) {
    const xWrap = this.getXWrap(x)
    const yWrap = this.getYWrap(y)
    return this.getIndexNoWrap(xWrap, yWrap)
  }

  getXWrap (x) {
    if (x < 0) {
      return (this.xCount + x) % this.xCount
    }
    return x % this.xCount
  }

  getYWrap (y) {
    if (y < 0) {
      return (this.yCount + y) % this.yCount
    }
    return y % this.yCount
  }

  getIndexNoWrap (x, y) {
    if (this.isValidCell(x, y)) {
      const index = (y * this.xCount) + x
      return index
    }
    return -1
  }

  isValidCell (x, y) {
    return (
      x >= 0 &&
      x < this.xCount &&
      y >= 0 &&
      y < this.yCount
    )
  }

  clone () {
    return new Cells({
      ...this,
      data: [...this.data]
    })
  }

  countNeighbors (x, y) {
    const neighbors = this.getNeighbors(x, y)
    // console.log('neighbors', neighbors)
    return neighbors.reduce((acc, cell) => {
      if (cell === 0) {
        acc.dead++
      } else if (cell === 1) {
        acc.alive++
      }
      return acc
    }, { alive: 0, dead: 0 })
  }

  getNeighbors (x, y) {
    return [
      this.get(x - 1, y - 1),
      this.get(x, y - 1),
      this.get(x + 1, y - 1),
      this.get(x - 1, y),
      this.get(x + 1, y),
      this.get(x - 1, y + 1),
      this.get(x, y + 1),
      this.get(x + 1, y + 1)
    ]
  }

  set ({ x, y, newValue }) {
    const index = this.getIndex(x, y)
    this.data[index] = newValue
  }

  isMatch (other) {
    if (!this.isShapeMatch(other)) {
      return false
    }

    return this.isDataMatch(other)
  }

  isShapeMatch (other) {
    return (
      this.data.length === other.data.length &&
      this.xCount === other.xCount &&
      this.yCount === other.yCount
    )
  }

  isDataMatch (other) {
    for (let index = 0; index < this.data.length; index++) {
      if (this.data[index] !== other.data[index]) {
        return false
      }
    }
    return true
  }
}
