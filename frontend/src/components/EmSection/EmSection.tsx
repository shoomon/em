import { ReactNode } from "react"

import { cn } from "@/utils/cn"

interface EmSectionProps {
  children?: ReactNode
  hasBorder?: boolean
  hasRound?: boolean
  className?: string
}

const EmSection = ({
  children,
  hasBorder = false,
  hasRound = false,
  className,
}: EmSectionProps) => {
  return (
    <section
      className={cn(
        "w-full h-full flex flex-col gap-5 p-5 transition-all duration-200",
        "bg-em-white",
        hasRound && "rounded-xl",
        hasBorder && "border border-em-gray",
        className,
      )}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title?: string | ReactNode
  description?: string | ReactNode
  headerRight?: string | ReactNode
}

const EmSectionHeader = ({
  title,
  description,
  headerRight,
}: SectionHeaderProps) => {
  return (
    <header className="flex flex-col gap-1 sm:gap-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        {title && (
          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-em-black">
            {title}
          </h3>
        )}
        {headerRight && (
          <div className="text-sm sm:text-base text-em-black/60">
            {headerRight}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm sm:text-base text-em-black/60 leading-relaxed">
          {description}
        </p>
      )}
    </header>
  )
}

interface SectionFooterProps {
  children?: ReactNode
}

const EmSectionFooter = ({ children }: SectionFooterProps) => {
  return <footer className="">{children}</footer>
}

// 서브 컴포넌트 패턴 적용
EmSection.Header = EmSectionHeader
EmSection.Footer = EmSectionFooter

export default EmSection
