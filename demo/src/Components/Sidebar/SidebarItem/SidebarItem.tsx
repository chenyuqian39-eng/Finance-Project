interface Props {
  icon: string;
  title: string;
  onItemClicked: () => void;
  isActive: boolean;
}

const SidebarItem = ({ icon, title, onItemClicked, isActive }: Props) => {
  return (
    <button
      type="button"
      className={`mb-2 flex w-full items-center gap-3 rounded px-3 py-3 text-left text-xs font-bold uppercase transition-colors ${
        isActive
          ? "bg-lightBlue text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
      onClick={onItemClicked}
      aria-pressed={isActive}
    >
      <span aria-hidden="true">{icon}</span>
      {title}
    </button>
  );
};

export default SidebarItem;
