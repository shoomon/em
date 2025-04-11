export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return ((num / 1_000_000_000) * 10) / 10 + "B"
  } else if (num >= 1_000_000) {
    return Math.floor((num / 1_000_000) * 10) / 10 + "M"
  } else if (num >= 1_000) {
    return Math.floor((num / 1_000) * 10) / 10 + "K"
  }

  return num.toString()
}
