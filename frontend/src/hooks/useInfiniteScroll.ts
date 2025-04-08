import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query"
import { useEffect, useRef } from "react"

interface UseInfiniteScrollProps<TData, TError>
  extends UseInfiniteQueryOptions<TData, TError> {
  rootMargin?: string
  threshold?: number
}

const useInfiniteScroll = <TData, TError = unknown>({
  rootMargin = "0px",
  threshold = 0.1,
  queryKey,
  queryFn,
  getNextPageParam,
  enabled = true,
  ...queryOptions
}: UseInfiniteScrollProps<TData, TError>) => {
  const observerRef = useRef<HTMLDivElement>(null) // 마지막 요소를 감지할 ref

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
    isError,
    ...restQueryResults
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    enabled,
    retry: 0,
    ...queryOptions,
  })

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || !enabled) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [
    rootMargin,
    threshold,
    hasNextPage,
    fetchNextPage,
    enabled,
    isFetchingNextPage,
  ])

  return {
    data,
    fetchNextPage, // 다음 요청
    hasNextPage, // 다음 요청 가능 여부
    isFetchingNextPage, // 다음 요청 진행 여부
    isPending, // 초기 로딩 여부
    observerRef, // 마지막 요소를 감지할 ref
    error, // 에러 상태
    isError, // 에러 발생 여부
    ...restQueryResults, // 기타 useInfiniteQuery 결과값
  }
}

export default useInfiniteScroll
