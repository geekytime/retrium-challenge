import React from 'react'
import { useStore } from './store.js'
import './life.less'

export const Life = () => {
  const store = useStore()

  return (
    <div className="Life">
      {renderRows(store)}
    </div>
  )
}

const renderRows = ({ data, xCount, yCount }) => {
  const rows = Array.from({ length: yCount })
  return rows.map((_, y) => {
    const className = `row row-${y}`
    const key = `row_${y}`
    return (
      <div className={className} key={key}>
        {renderCells({ data, y, xCount })}
      </div>
    )
  })
}

const renderCells = ({ data, y, xCount }) => {
  const start = y * xCount
  const end = start + xCount
  const rowData = data.slice(start, end)

  return rowData.map((cell, x) => {
    return renderCell({ cell: cell.get(), x, y })
  })
}

const renderCell = ({ cell, x, y }) => {
  const className = getCellClass({ cell, x, y })
  const key = `cell_${x}_${y}`
  return (
    <div className={className} key={key}>&nbsp;</div>
  )
}

const getCellClass = ({ cell, x, y }) => {
  const base = `cell cell-${x}-${y}`
  if (cell === 1) {
    return  `${base} alive`
  }
  return `${base} dead`
}

