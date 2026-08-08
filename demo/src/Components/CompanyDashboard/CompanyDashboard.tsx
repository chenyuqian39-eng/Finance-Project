import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import type { CompanyProfileSummary } from "../../api";

interface Props {
  company: CompanyProfileSummary;
  children: ReactNode;
}

const CompanyDashboard = ({
  company,
  children,
}: Props) => {
  return (
    <section className="relative w-full bg-slate-50 md:ml-64">
      <div className="relative min-h-screen px-4 pb-20 pt-10 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap">{children}</div>
          <div className="mt-2 rounded-lg bg-white p-6 shadow-lg">
            <Outlet context={{ company }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyDashboard;
