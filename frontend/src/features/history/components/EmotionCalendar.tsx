import { useEffect, useMemo, useState } from "react"
import { Calendar as ReactCalendar } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useNavigate } from "react-router-dom"
import { fetchEmotionCalendar } from "../api/emotionCalendarApi"
import { getWeekdayColorClass } from "../utils/getCalendarColor"
import { getEmotionColorClass } from "../utils/getEmotionColor"
import "./EmotionCalendar.css"

interface EmotionCalendarProps {
  selectedDate: string
  onSelectDate: (date: string) => void
}

const EmotionCalendar = ({ selectedDate, onSelectDate }: EmotionCalendarProps) => {
  // const navigate = useNavigate()
  const today = useMemo(() => new Date(), [])

  const [calendarView, setCalendarView] = useState<
    "month" | "year" | "decade" | "century"
  >("month")

  const [emotionData, setEmotionData] = useState<Record<string, string>>({})

  const [activeMonth, setActiveMonth] = useState(() => {
    // const saved = sessionStorage.getItem("activeMonth")
    // if (saved) return saved

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

    // sessionStorage.setItem("activeMonth", activeMonth)
  }, [activeMonth])

  const handleDateClick = (date: Date) => {
    // setSelectedDate(date)

    // KST로 보정한 날짜를 YYYY-MM-DD 형식으로 저장
    const localOffset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - localOffset)
    const formatted = localDate.toISOString().split("T")[0]

    onSelectDate(formatted)
    // sessionStorage.setItem("selectedDate", formatted)
    // navigate("/mypage/list", { viewTransition: true })
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
        onViewChange={({ view }) => setCalendarView(view)}
        activeStartDate={new Date(`${activeMonth}-01`)}
        // formatDay={(_, date) => String(date.getDate())}
        formatDay={() => ""}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileContent={({ date }) => {
          if (calendarView !== "month") return null

          const day = date.getDate().toString()
          const emotion = emotionData[day]
          const emotionBgClass = emotion ? getEmotionColorClass(emotion) : ""
          const textColorClass = getWeekdayColorClass(date)

          return (
            <div className="flex flex-col items-center justify-center gap-y-1 w-full h-full">
              <abbr
                title={date.toDateString()}
                className={`no-underline relative z-10 ${textColorClass}`}>
                {date.getDate()}
              </abbr>
              <div
                  className={`react-calendar__emotion-dot ${emotionBgClass}`}
              />
            </div>
          )
        }}
        tileClassName={({ date, view }) => {
          if (view === "year") {
            const selected = new Date(selectedDate)
            // const selectedYear = selectedDate.getFullYear()
            // const selectedMonth = selectedDate.getMonth()
            // const currentYear = date.getFullYear()
            // const currentMonth = date.getMonth()

            if (
              // selectedYear === currentYear &&
              // selectedMonth === currentMonth
              date.getFullYear() === selected.getFullYear() &&
      date.getMonth() === selected.getMonth()
            ) {
              return "react-calendar__tile--active !text-em-black"
            }
          }
          return undefined
        }}
        className="react-calendar"
      />
    </div>
  )
}

export default EmotionCalendar
