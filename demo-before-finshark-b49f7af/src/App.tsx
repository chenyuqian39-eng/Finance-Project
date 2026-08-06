import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { searchCompanies } from "./api";
import type { CompanySearch } from "./company";
import ListPortfolio from "./Components/Portfolio/ListPortfolio";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const symbol = String(formData.get("symbol"));
    const exists = portfolioValues.find((value) => value === symbol);

    if (exists) return;
    const updatedPortfolio = [...portfolioValues, symbol];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const symbol = String(formData.get("symbol"));
    const removed = portfolioValues.filter((value) => {
      return value !== symbol;
    });
    setPortfolioValues(removed);
  };

  const onSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    //setServerError(result.data);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  return (
    <>
      <Navbar />
      <Search
        onSubmit={onSearchSubmit}
        search={search}
        handleChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResult={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>Unable to connect to API</div>}
    </>
  );
}

export default App;
