import { RefObject, useEffect, useRef, useState } from "react"
import { YOUTUBE_PLAYER_POSITION_OFFSET } from "../constants"

const useMusicPlayerDrag = (playerRef: RefObject<HTMLDivElement | null>) => {
  const draggingRef = useRef(false)
  const dragStartPositionRef = useRef({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 }) // 이벤트 함수로 position을 사용할 경우, 클로져로 동작하여 그때 당시의 position(0, 0) 값만 갖게 되므로 참조(ref) 변수가 필요하다.
  const oldPositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const quadrantRef = useRef(4) // 사분면

  useEffect(() => {
    if (!playerRef.current) {
      return
    }

    const updatePosition = () => {
      if (!playerRef.current) {
        return
      }

      const { width, height } = playerRef.current.getBoundingClientRect()
      let newPosition = { ...positionRef.current }

      switch (quadrantRef.current) {
        case 1:
          newPosition.x =
            window.innerWidth - width - YOUTUBE_PLAYER_POSITION_OFFSET
          newPosition.y = YOUTUBE_PLAYER_POSITION_OFFSET
          break
        case 2:
          newPosition.x = YOUTUBE_PLAYER_POSITION_OFFSET
          newPosition.y = YOUTUBE_PLAYER_POSITION_OFFSET
          break
        case 3:
          newPosition.x = YOUTUBE_PLAYER_POSITION_OFFSET
          newPosition.y =
            window.innerHeight - height - YOUTUBE_PLAYER_POSITION_OFFSET
          break
        case 4:
          newPosition.x =
            window.innerWidth - width - YOUTUBE_PLAYER_POSITION_OFFSET
          newPosition.y =
            window.innerHeight - height - YOUTUBE_PLAYER_POSITION_OFFSET
          break
      }

      setPosition(newPosition)
      positionRef.current = newPosition
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (!playerRef.current) {
        return
      }

      e.stopPropagation()

      // 닫기 버튼이 눌렸을 경우 종료
      if ((e.target as HTMLElement).closest("button")) {
        return
      }

      e.preventDefault()
      draggingRef.current = true
      dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
      oldPositionRef.current = { ...positionRef.current }
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
      snapToCorner()
    }

    // 초기 위치 설정
    const { width, height } = playerRef.current.getBoundingClientRect()
    const initPosition = {
      x: window.innerWidth - width - YOUTUBE_PLAYER_POSITION_OFFSET,
      y: window.innerHeight - height - YOUTUBE_PLAYER_POSITION_OFFSET,
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

  const snapToCorner = () => {
    if (!playerRef.current) {
      return
    }

    let { x, y, width, height } = playerRef.current.getBoundingClientRect()
    x += width / 2
    y += height / 2
    const screenMid = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let newPosition = { ...positionRef.current }

    // 플레이어가 속한 사분면 구하기
    if (x < screenMid.x) {
      // 2사분면
      if (y < screenMid.y) {
        newPosition.x = YOUTUBE_PLAYER_POSITION_OFFSET
        newPosition.y = YOUTUBE_PLAYER_POSITION_OFFSET
        quadrantRef.current = 2
      }
      // 3사분면
      else {
        newPosition.x = YOUTUBE_PLAYER_POSITION_OFFSET
        newPosition.y =
          window.innerHeight - height - YOUTUBE_PLAYER_POSITION_OFFSET
        quadrantRef.current = 3
      }
    } else {
      // 1사분면
      if (y < screenMid.y) {
        newPosition.x =
          window.innerWidth - width - YOUTUBE_PLAYER_POSITION_OFFSET
        newPosition.y = YOUTUBE_PLAYER_POSITION_OFFSET
        quadrantRef.current = 1
      }
      // 4사분면
      else {
        newPosition.x =
          window.innerWidth - width - YOUTUBE_PLAYER_POSITION_OFFSET
        newPosition.y =
          window.innerHeight - height - YOUTUBE_PLAYER_POSITION_OFFSET
        quadrantRef.current = 4
      }
    }

    setPosition(newPosition)
    positionRef.current = newPosition
    console.log(
      "x:",
      x,
      "y:",
      y,
      "window:",
      window.innerWidth / 2,
      window.innerHeight / 2,
    )
  }

  return { isDragging: draggingRef.current, position }
}

export default useMusicPlayerDrag
