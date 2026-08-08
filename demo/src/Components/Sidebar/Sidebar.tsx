import { NavLink } from "react-router-dom";
import { FaBuilding, FaTable } from "react-icons/fa";

const Sidebar = () => {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `mb-2 flex w-full items-center gap-3 rounded px-3 py-3 text-xs font-bold uppercase transition-colors ${
      isActive
        ? "bg-lightBlue text-white"
        : "text-slate-500 hover:bg-slate-100"
    }`;

  return (
    <nav
      className="absolute bottom-0 left-0 top-0 hidden w-64 bg-white px-6 py-4 shadow-xl md:block"
      aria-label="Company sections"
    >
      <div className="mt-4 flex min-h-full w-full flex-col">
        <NavLink to="company-profile" className={linkClassName}>
          <FaBuilding aria-hidden="true" />
          Company Profile
        </NavLink>
        <NavLink to="income-statement" className={linkClassName}>
          <FaTable aria-hidden="true" />
          Income Statement
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
