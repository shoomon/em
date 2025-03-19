import { ChangeEvent, TextareaHTMLAttributes, useState } from "react"

import { cn } from "@/utils/cn"

interface EmTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  placeholder?: string
  maxLength?: number
}

const EmTextArea = ({
  className,
  placeholder = "이곳에 텍스트를 입력해 주세요.",
  maxLength = 500,
  ...props
}: EmTextAreaProps) => {
  const [text, setText] = useState("")

  const isOverMaxLength = text.length >= maxLength

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
    if (value.length > maxLength) {
      setText(value.slice(0, maxLength))
    }
  }

  return (
    <div className="w-full h-full bg-em-white flex flex-col gap-2 p-4 border border-em-gray-md rounded-xl">
      <textarea
        onChange={handleChange}
        value={text}
        className={cn("outline-none resize-none w-full h-full min-h-60", className)}
        {...props}
        placeholder={placeholder}
      />
      <p className="flex justify-end items-center gap-2 text-sm text-em-gray">
        <span className={cn({ "text-em-anger": isOverMaxLength })}>{text.length}</span>
        <span className="">/ {maxLength}</span>
      </p>
    </div>
  )
}
export default EmTextArea
