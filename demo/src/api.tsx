import axios from "axios";
import type { CompanySearch } from "./company";

interface FmpSearchResult {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  exchangeFullName: string;
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<FmpSearchResult[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${encodeURIComponent(
        query
      )}&limit=10&apikey=${process.env.REACT_APP_API_KEY}`
    );

    const data: CompanySearch[] = response.data.map((company) => ({
      symbol: company.symbol,
      name: company.name,
      currency: company.currency,
      exchangeShortName: company.exchange,
      stockExchange: company.exchangeFullName,
    }));

    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occurred.";
    }
  }
};
