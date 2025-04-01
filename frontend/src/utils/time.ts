export const getRelativeTime = (dateString: string): string => {
  const now = new Date()
  let past = new Date(dateString)

  // 배포 환경이라면, UTC+9로 변환
  const isProd = process.env.NODE_ENV === "production"
  if (isProd) {
    past = new Date(past.getTime() + 9 * 60 * 60 * 1000)
  }

  const diffMs = now.getTime() - past.getTime()

  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) {
    return "방금"
  }

  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) {
    return `${diffMin}분 전`
  }

  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) {
    return `${diffHour}시간 전`
  }

  const diffDay = Math.floor(diffHour / 24)
  return `${diffDay}일 전`
}
