import "./Card.css"
import type { MouseEvent } from 'react'
import type { CompanySearch } from "../../company";
import AddPortfolio from '../Portfolio/AddPortfolio'

interface Props {
    searchResult: CompanySearch;
    onPortfolioCreate: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ searchResult, onPortfolioCreate }: Props) => {
    return (
        <div className="card">
            <div className="details">
                <h2>{searchResult.name}({searchResult.symbol})</h2>
                <p>{searchResult.currency}</p>
            </div>
            <p className="info">
                {searchResult.exchange} - {searchResult.exchangeFullName}
            </p>
            <AddPortfolio
                symbol={searchResult.symbol}
                onPortfolioCreate={onPortfolioCreate}
            />
        </div>
    )
}

export default Card
