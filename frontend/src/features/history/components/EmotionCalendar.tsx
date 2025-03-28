import { useMemo, useState } from "react"
import { Calendar as ReactCalendar } from "react-calendar"
import "react-calendar/dist/Calendar.css"

const EmotionCalendar = () => {
  const today = useMemo(() => new Date(), [])

  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("selectedDate")
    return saved ? new Date(saved) : today
  })

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    localStorage.setItem("selectedDate", date.toISOString())
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ReactCalendar
        value={selectedDate}
        onClickDay={handleDateClick}
        formatDay={(_, date) => String(date.getDate())}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileClassName="relative flex justify-center items-center h-12 text-sm rounded-lg transition hover:bg-gray-100"
        className="react-calendar
          !border-none
          [&_.react-calendar__month-view__weekdays_abbr>abbr]:[text-decoration:none]
        "
      />

      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow text-center text-sm text-gray-500">
        🛠️(개발 중) 기록 보기는 현재 준비 중이에요!
      </div>
    </div>
  )
}

export default EmotionCalendar
