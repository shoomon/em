export const getWeekdayColorClass = (date: Date) => {
  const day = date.getDay()
  if (day === 0) return "text-red-500" // 일요일
  if (day === 6) return "text-blue-500" // 토요일
  return "text-em-black" // 평일
}

export const formatDateToYMD = (date: Date): string => {
  return date.toISOString().split("T")[0] // "2025-04-01"
}
