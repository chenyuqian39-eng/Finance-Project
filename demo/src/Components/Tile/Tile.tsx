interface Props {
  title: string;
  subTitle: string;
}

const Tile = ({ title, subTitle }: Props) => {
  return (
    <div className="w-full px-4 pb-6 lg:w-6/12 xl:w-3/12">
      <div className="flex min-w-0 flex-col rounded-lg bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xs font-bold uppercase text-slate-400">
            {title}
          </h2>
          <p className="break-words text-xl font-bold">{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Tile;
