import IncomeStatement from "../../Components/IncomeStatement/IncomeStatement";

const DesignGuide = () => (
  <main className="container mx-auto p-6">
    <h1 className="mb-3 text-3xl font-bold">FinShark Design Guide</h1>
    <p className="mb-8 text-slate-600">
      Reusable components used by the application, with examples of their
      appearance and behavior.
    </p>
    <IncomeStatement />
    <p className="mt-5 text-sm text-slate-500">
      Table receives row data, column configuration, and a stable row-key
      function.
    </p>
  </main>
);

export default DesignGuide;
