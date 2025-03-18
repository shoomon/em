import { useState } from "react"

interface SortTypeSelectorProps {
  contents: { label: string; sortType: string }[]
  className?: string
}

const SortTypeSelector = ({ contents, className }: SortTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState(contents[0].sortType)

  return (
    <ul className={`flex items-center gap-6 px-5 py-3 bg-em-white ${className}`}>
      {contents.map((item) => (
        <li key={item.label}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={item.sortType}
              value={item.sortType}
              checked={selectedType === item.sortType}
              onChange={() => setSelectedType(item.sortType)}
              className="hidden"
            />
            <div
              className={`size-1 rounded-full ${selectedType === item.sortType ? "bg-em-black" : "bg-em-gray"}`}
            />
            <p
              className={`text-sm font-semibold ${selectedType === item.sortType ? "text-em-black" : "text-em-gray"}`}>
              {item.label}
            </p>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default SortTypeSelector
