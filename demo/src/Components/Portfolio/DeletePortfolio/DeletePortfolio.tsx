interface Props {
  onPortfolioDelete: (symbol: string) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onPortfolioDelete(portfolioValue);
        }}
      >
        <button
          type="submit"
          className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500"
        >
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
