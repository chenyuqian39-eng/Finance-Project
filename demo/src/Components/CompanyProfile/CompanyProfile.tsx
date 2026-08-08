import type { CompanyProfileSummary } from "../../api";
import { useOutletContext } from "react-router-dom";

interface CompanyOutletContext {
  company: CompanyProfileSummary;
}

const formatLargeNumber = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

const CompanyProfile = () => {
  const { company } = useOutletContext<CompanyOutletContext>();
  const tags = [
    company.symbol,
    company.exchange,
    company.industry,
    company.sector,
    company.country,
  ].filter(Boolean);

  const metrics = [
    {
      label: "Market Cap",
      description: "Total market value of the company's outstanding shares.",
      value: formatLargeNumber(company.marketCap, company.currency),
    },
    {
      label: "Beta",
      description: "How strongly the stock moves compared with the market.",
      value: company.beta?.toFixed(2) ?? "N/A",
    },
    {
      label: "Last Dividend",
      description: "The company's latest annualized dividend value.",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: company.currency,
      }).format(company.lastDividend),
    },
    {
      label: "Employees",
      description: "Reported number of full-time employees.",
      value: company.fullTimeEmployees || "N/A",
    },
  ];

  return (
    <article>
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        {company.image ? (
          <img
            className="h-20 w-20 rounded-xl border border-slate-200 object-contain p-2"
            src={company.image}
            alt={`${company.companyName} logo`}
          />
        ) : null}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {company.companyName}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-lightGreen px-3 py-1 text-xs font-bold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <p className="py-7 leading-7 text-slate-600">
        {company.description || "No company description is available."}
      </p>

      <dl className="divide-y divide-slate-200 border-t border-slate-200">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <dt className="font-bold text-slate-900">{metric.label}</dt>
              <dd className="text-sm text-slate-500">{metric.description}</dd>
            </div>
            <dd className="font-bold text-slate-900">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <footer className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        <span>
          CEO: <strong>{company.ceo || "N/A"}</strong>
        </span>
        {company.website ? (
          <a
            className="font-bold text-darkBlue hover:underline"
            href={company.website}
            target="_blank"
            rel="noreferrer"
          >
            Company website
          </a>
        ) : null}
      </footer>
    </article>
  );
};

export default CompanyProfile;
