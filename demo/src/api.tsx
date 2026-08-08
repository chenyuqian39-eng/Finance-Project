import axios from "axios";
import type { CompanySearch } from "./company";

interface FmpSearchResult {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  exchangeFullName: string;
}

export interface CompanyProfileSummary {
  symbol: string;
  companyName: string;
  price: number;
  marketCap: number;
  beta: number;
  lastDividend: number;
  dcf: number | null;
  currency: string;
  exchange: string;
  exchangeFullName: string;
  industry: string;
  sector: string;
  country: string;
  ceo: string;
  fullTimeEmployees: string;
  website: string;
  description: string;
  image: string;
}

interface FmpDcfResult {
  symbol: string;
  date: string;
  dcf: number;
  "Stock Price": number;
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

export const getCompanyProfile = async (
  ticker: string,
  signal?: AbortSignal
): Promise<CompanyProfileSummary | null> => {
  const encodedTicker = encodeURIComponent(ticker);
  const apiKey = process.env.REACT_APP_API_KEY;

  const [profileResponse, dcfResponse] = await Promise.all([
    axios.get<Omit<CompanyProfileSummary, "dcf">[]>(
      `https://financialmodelingprep.com/stable/profile?symbol=${encodedTicker}&apikey=${apiKey}`,
      { signal }
    ),
    axios
      .get<FmpDcfResult[]>(
        `https://financialmodelingprep.com/stable/discounted-cash-flow?symbol=${encodedTicker}&apikey=${apiKey}`,
        { signal }
      )
      .catch((error) => {
        if (axios.isCancel(error)) {
          throw error;
        }
        return null;
      }),
  ]);

  const profile = profileResponse.data[0];
  if (!profile) return null;

  return {
    ...profile,
    dcf: dcfResponse?.data[0]?.dcf ?? null,
  };
};
