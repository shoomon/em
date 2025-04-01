import { debounce } from "lodash-es"
import { SearchIcon } from "lucide-react"
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
} from "react"

interface EmInputProps {
  keyword: string
  onChange: Dispatch<SetStateAction<string>>
  onSearch: (e: FormEvent<HTMLFormElement>) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const EmInput = ({
  onChange,
  onSearch,
  placeholder,
  disabled,
  className,
}: EmInputProps) => {
  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }, 200),
    [],
  )

  return (
    <form
      onSubmit={onSearch}
      className={`flex items-center gap-2 p-2  w-full bg-em-gray-sm rounded-lg ${className}`}>
      <SearchIcon className="stroke-em-DISGUST" />
      <input
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className="flex-1"
        disabled={disabled}
      />
    </form>
  )
}

export default EmInput
