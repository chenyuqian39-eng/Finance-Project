import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getCompanyProfile,
  type CompanyProfileSummary,
} from "../../api";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tile from "../../Components/Tile/Tile";

const formatMoney = (value: number | null, currency: string) =>
  value === null
    ? "N/A"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(value);

const CompanyPage = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<CompanyProfileSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setError("Company ticker is missing.");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadCompanyProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const profile = await getCompanyProfile(ticker, controller.signal);
        setCompany(profile);
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError("Unable to load company profile.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCompanyProfile();

    return () => controller.abort();
  }, [ticker]);

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading company…</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6" role="alert">
        {error}
      </div>
    );
  }

  if (!company) {
    return <div className="container mx-auto p-6">Company not found.</div>;
  }

  return (
    <main className="company-profile-container relative flex w-full overflow-x-hidden">
      <Sidebar />
      <CompanyDashboard company={company}>
        <Tile title="Company Name" subTitle={company.companyName} />
        <Tile
          title="Price"
          subTitle={formatMoney(company.price, company.currency)}
        />
        <Tile title="DCF" subTitle={formatMoney(company.dcf, company.currency)} />
        <Tile title="Sector" subTitle={company.sector || "N/A"} />
      </CompanyDashboard>
    </main>
  );
};

export default CompanyPage;
