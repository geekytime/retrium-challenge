import { createContext, useContext } from 'react'
import { createState, useState } from '@hookstate/core'
import { createRandomCells } from '../create-random-cells.js'
import { tick } from '../game.js'

export const StoreContext = createContext()

export const createStore = () => {
  const cells = createRandomCells({
    xCount: 50,
    yCount: 50
  })

  const store = {
    data: createState(cells.data),
    xCount: cells.xCount,
    yCount: cells.yCount,
    tick: () => {
      const nextCells = tick({ cells })
      cells.data = nextCells.data
      store.data.set(nextCells.data)
      store.tickCount.set(store.tickCount.value + 1)
    },
    tickCount: createState(0)
  }

  setInterval(() => {
    store.tick()
  }, 1000 / 15)
  return store
}

export const useStore = () => {
  const { store } = useContext(StoreContext)  
  return {
    ...store,
    data: useState(store.data),
    tickCount: useState(store.tickCount)
  }
}