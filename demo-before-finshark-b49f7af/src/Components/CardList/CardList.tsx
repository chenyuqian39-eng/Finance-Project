import type { FormEvent } from "react";
import Card from "../Card/Card";
import type { CompanySearch } from "../../company";

interface Props {
    searchResult: CompanySearch[];
    onPortfolioCreate: (e: FormEvent<HTMLFormElement>) => void;
}

const CardList = ({
    searchResult,
    onPortfolioCreate,
}: Props) => {
    return (
        <div>
            {searchResult.length > 0 ? (
                searchResult.map((result) => {
                    return (
                        <Card
                            id={result.symbol}
                            key={`${result.symbol}-${result.exchange}`}
                            searchResult={result}
                            onPortfolioCreate={onPortfolioCreate}
                        />
                    );
                })
            ) : (
                <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                    No results!
                </p>
            )}
        </div>
    );
};

export default CardList;
