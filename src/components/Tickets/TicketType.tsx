interface TicketTypeProps {
  type: string;
  numberLeft: number;
  price: string;
  isSelected: boolean;
  onClick: () => void;
}

const TicketType = ({
  type,
  numberLeft,
  price,
  isSelected,
  onClick,
}: TicketTypeProps) => {
  return (
    <button
      className={`flex flex-col gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer w-full max-h-[110px] ${
        isSelected
          ? "bg-[#12464E] border-[#197686]"
          : "bg-transparent border-[#2BA4B9]"
      } hover:bg-[#2C545B] hover:border-[#197686]`}
      onClick={onClick}
    >
      <h1 className="font-roboto text-2xl font-semibold leading-[26.4px]">
        {price}
      </h1>
      <div className="text-left">
        <h2 className="font-roboto text-base font-normal leading-6 uppercase text-foreground">
          {type}
        </h2>
        <p className="text-[14px] font-normal leading-[21px] text-[#D9D9D9]">
          {numberLeft}/52
        </p>
      </div>
    </button>
  );
};

export default TicketType;
