interface MusicChartCategoryButtonProps {
  selected: boolean
  label: string

  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MusicChartCategoryButtonButton = ({
  selected,
  label,
  onClick,
}: MusicChartCategoryButtonProps) => {
  return (
    <button
      className={`cursor-pointer text-em-gray px-3 py-0.5 text-sm xs:text-base border rounded-full border-em-gray-md shrink-0 select-none ${selected ? "bg-em-black text-em-white" : ""}`}
      onClick={onClick}>
      {label}
    </button>
  )
}

export default MusicChartCategoryButtonButton
