const toQueryString = (params: Record<string, string | number | boolean | null | undefined>) => {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        // null과 undefined만 제외
        if (value !== null && value !== undefined) {
          acc[key] = String(value)
        }
        return acc
      },
      {} as Record<string, string>,
    ),
  ).toString()
}

export default toQueryString
