import Card from '../Card/Card'
import type { MouseEvent } from 'react'
import type { CompanySearch } from '../../company'

interface Props {
    searchResult: CompanySearch[]
    onPortfolioCreate: (e: MouseEvent<HTMLButtonElement>) => void
}

const CardList = ({ searchResult, onPortfolioCreate }: Props) => {
    return (
        <div>
            {searchResult.length > 0 ? (
                searchResult.map((result) => (
                    <Card
                        key={`${result.symbol}-${result.exchange}`}
                        searchResult={result}
                        onPortfolioCreate={onPortfolioCreate}
                    />
                ))
            ) : (
                <h1>No results found</h1>
            )}
        </div>
    )
}

export default CardList
