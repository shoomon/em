import { CircleXIcon, SearchIcon } from "lucide-react"
import { FormEvent, Ref } from "react"

interface EmInputProps {
  ref?: Ref<HTMLInputElement>
  placeholder?: string
  className?: string

  onSearch: (e: FormEvent<HTMLFormElement>) => void
  onReset?: () => void
}

const EmInput = ({
  ref,
  placeholder,
  className,
  onSearch,
  onReset,
}: EmInputProps) => {
  return (
    <form
      onSubmit={onSearch}
      className={`flex items-center gap-2 px-2 py-1.5 w-full bg-em-gray-sm rounded-xl group focus-within:outline-2 outline-em-black ${className}`}>
      <SearchIcon className="stroke-em-DISGUST size-5" />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="flex-1 outline-none"
      />
      <button type="button" className="cursor-pointer size-5" onClick={onReset}>
        <CircleXIcon className="size-full fill-em-gray stroke-em-gray-sm" />
      </button>
    </form>
  )
}

export default EmInput
