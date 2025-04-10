interface OnboardingIndicatorsProps {
  total: number
  current: number
}

const OnboardingIndicators = ({
  total,
  current,
}: OnboardingIndicatorsProps) => {
  return (
    <div className="flex gap-2 mt-4 mb-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-all ${
            i === current ? "bg-em-black" : "bg-em-gray"
          }`}
        />
      ))}
    </div>
  )
}

export default OnboardingIndicators
