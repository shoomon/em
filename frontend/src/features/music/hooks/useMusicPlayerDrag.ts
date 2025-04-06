import { RefObject, useEffect, useRef, useState } from "react"
import { YOUTUBE_PLAYER_POSITION_OFFSET } from "../constants"

const useMusicPlayerDrag = (playerRef: RefObject<HTMLDivElement | null>) => {
  const draggingRef = useRef(false)
  const dragStartPositionRef = useRef({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 10, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 }) // 이벤트 함수로 position을 사용할 경우, 클로져로 동작하여 그때 당시의 position(0, 0) 값만 갖게 되므로 참조(ref) 변수가 필요하다.
  const oldPositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!playerRef.current) {
      return
    }

    const updatePosition = () => {
      if (!playerRef.current) {
        return
      }

      const { right, bottom, width, height } =
        playerRef.current.getBoundingClientRect()
      let newPosition = { ...positionRef.current }
      const offset = YOUTUBE_PLAYER_POSITION_OFFSET

      if (right > window.innerWidth) {
        newPosition.x = window.innerWidth - width - offset
      }

      if (bottom > window.innerHeight) {
        newPosition.y = window.innerHeight - height - offset
      }

      setPosition(newPosition)
      positionRef.current = newPosition
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (!playerRef.current) {
        return
      }

      // 닫기 버튼이 눌렸을 경우 종료
      if ((e.target as HTMLElement).closest("button")) {
        return
      }

      draggingRef.current = true
      dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
      oldPositionRef.current = { ...positionRef.current }
      e.preventDefault()
      playerRef.current.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) {
        return
      }

      // 너무 빈번한 호출을 막고 60프레임에 한 번씩 호출되도록 requestAnimationFrame 함수를 사용
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const dx = e.clientX - dragStartPositionRef.current.x
        const dy = e.clientY - dragStartPositionRef.current.y
        const newPosition = {
          x: oldPositionRef.current.x + dx,
          y: oldPositionRef.current.y + dy,
        }
        setPosition(newPosition)
        positionRef.current = newPosition
      })
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (!playerRef.current) {
        return
      }

      draggingRef.current = false
      playerRef.current.releasePointerCapture(e.pointerId)
      cancelAnimationFrame(animationFrameRef.current!)
    }

    // 초기 위치 설정
    const { width, height } = playerRef.current.getBoundingClientRect()
    const offset = YOUTUBE_PLAYER_POSITION_OFFSET
    const initPosition = {
      x: window.innerWidth - width - offset,
      y: window.innerHeight - height - offset,
    }
    setPosition(initPosition)
    positionRef.current = initPosition

    // 이벤트 함수 등록
    window.addEventListener("resize", updatePosition)
    playerRef.current.addEventListener("pointerdown", handlePointerDown)
    playerRef.current.addEventListener("pointermove", handlePointerMove)
    playerRef.current.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("resize", updatePosition)

      if (playerRef.current) {
        playerRef.current.removeEventListener("pointerdown", handlePointerDown)
        playerRef.current.removeEventListener("pointermove", handlePointerMove)
        playerRef.current.removeEventListener("pointerup", handlePointerUp)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return position
}

export default useMusicPlayerDrag
