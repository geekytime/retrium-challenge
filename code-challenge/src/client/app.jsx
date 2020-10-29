import { Header } from './header.jsx'
import { Life } from './life.jsx'
import React from 'react'
import { createStore, StoreContext } from './store.js'

export const App = () => {
  const store = createStore()

  return (
    <StoreContext.Provider
      value={{
        store
      }}
    >
      <div className="App">
        <Header />
        <Life />
      </div>
    </StoreContext.Provider>
  )
}
  