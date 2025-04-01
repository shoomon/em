import { useEffect, useMemo, useState } from "react"
import { Calendar as ReactCalendar } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { fetchEmotionCalendar } from "../api/emotionCalendarApi"
import { getEmotionColorClass } from "../utils/getEmotionColor"
import "./EmotionCalendar.css"
import { getWeekdayColorClass } from "../utils/getCalendarColor"
import { useNavigate } from "react-router-dom"

const EmotionCalendar = () => {
  const navigate = useNavigate()
  const today = useMemo(() => new Date(), [])

  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = sessionStorage.getItem("selectedDate")
    return saved ? new Date(saved) : today
  })

  const [emotionData, setEmotionData] = useState<Record<string, string>>({})

  const [activeMonth, setActiveMonth] = useState(() => {
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmotionCalendar(activeMonth)
        setEmotionData(data.dateColor || {})
      } catch (error) {
        console.error("Failed to fetch calendar data:", error)
      }
    }

    fetchData()
  }, [activeMonth])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)

    // KST로 보정한 날짜를 YYYY-MM-DD 형식으로 저장
    const localOffset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - localOffset)
    const formatted = localDate.toISOString().split("T")[0]

    sessionStorage.setItem("selectedDate", formatted)
    navigate("/mypage/list")
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ReactCalendar
        value={selectedDate}
        onClickDay={handleDateClick}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            const year = activeStartDate.getFullYear()
            const month = String(activeStartDate.getMonth() + 1).padStart(
              2,
              "0",
            )
            setActiveMonth(`${year}-${month}`)
          }
        }}
        // formatDay={(_, date) => String(date.getDate())}
        formatDay={() => ""}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileContent={({ date }) => {
          const day = date.getDate().toString()
          const emotion = emotionData[day]
          const emotionBgClass = emotion ? getEmotionColorClass(emotion) : ""
          const textColorClass = getWeekdayColorClass(date)

          return (
            <>
              {emotion && (
                <div
                  className={`react-calendar__emotion-dot ${emotionBgClass}`}
                />
              )}
              <abbr
                title={date.toDateString()}
                className={`no-underline relative z-10 ${textColorClass}`}>
                {date.getDate()}
              </abbr>
            </>
          )
        }}
        className="react-calendar"
      />
    </div>
  )
}

export default EmotionCalendar
