import { useQuery } from "@tanstack/react-query"
import { fetchEmotionCalendar } from "../api/emotionCalendarApi"

const useCalendarEmotions = (date: string) => {
  return useQuery({
    queryKey: ["emotion-calendar", date],
    queryFn: () => fetchEmotionCalendar(date),
    refetchOnWindowFocus: false,
    select: (data) => data.dateColor,
  })
}

export default useCalendarEmotions
