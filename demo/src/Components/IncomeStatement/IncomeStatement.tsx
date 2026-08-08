import Table, { type TableColumn } from "../Table/Table";
import { testIncomeStatementData } from "../Table/testData";

type IncomeStatementRow = (typeof testIncomeStatementData)[number];

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

const columns: TableColumn<IncomeStatementRow>[] = [
  { label: "Year", render: (row) => row.calendarYear },
  {
    label: "Revenue",
    render: (row) => formatCurrency(row.revenue, row.reportedCurrency),
  },
  {
    label: "Cost of Revenue",
    render: (row) => formatCurrency(row.costOfRevenue, row.reportedCurrency),
  },
  {
    label: "Gross Profit",
    render: (row) => formatCurrency(row.grossProfit, row.reportedCurrency),
  },
  {
    label: "Net Income",
    render: (row) => formatCurrency(row.netIncome, row.reportedCurrency),
  },
  { label: "EPS", render: (row) => row.eps.toFixed(2) },
];

const IncomeStatement = () => (
  <section>
    <h1 className="mb-5 text-2xl font-bold">Income Statement</h1>
    <Table
      data={testIncomeStatementData}
      columns={columns}
      getRowKey={(row) => `${row.symbol}-${row.date}-${row.period}`}
    />
  </section>
);

export default IncomeStatement;
