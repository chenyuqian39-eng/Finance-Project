import type { MouseEvent } from 'react'

interface Props {
  symbol: string
  onPortfolioCreate: (e: MouseEvent<HTMLButtonElement>) => void
}

function AddPortfolio({ symbol, onPortfolioCreate }: Props) {
  return (
    <button
      type="button"
      value={symbol}
      onClick={onPortfolioCreate}
    >
      Add to portfolio
    </button>
  )
}

export default AddPortfolio
