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
      className={`flex gap-3 p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bg-[#197686] border-[#197686]"
          : "bg-transparent border-[#2BA4B9]"
      } hover:bg-[#197686] hover:border-[#197686]`}
      onClick={onClick}
    >
      <div className="text-foreground w-full">
        <h2 className="uppercase font-roboto text-base font-normal leading-6 mb-1">
          {type}
        </h2>
        <h2 className="font-roboto text-[14px] font-normal leading-[21px]">
          {numberLeft} left!
        </h2>
      </div>
      <span className="flex p-2 self-start h-fit min-w-20 rounded-lg border border-[#2BA4B9] bg-[#0E464F] text-[20px] font-semibold leading-[22px] justify-end">
        {price}
      </span>
    </button>
  );
};

export default TicketType;
