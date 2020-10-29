import React from 'react'
import { useStore } from './store.js'

export const Header = () => {
  const store = useStore()
  const tickCount = store.tickCount.get()

  return (
    <div className="Header">
      Conway's Game of Life - tick {tickCount}
    </div>
  )
}