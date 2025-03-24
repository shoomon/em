import useMap from "@/features/map/hooks/useMap"
import { Post } from "@/features/post/types/post"
import { ReactNode, useEffect, useRef } from "react"
import htmlClusterMarkers from "../constants"

interface MapViewerProps {
  isDenied: boolean
  location: { lat: number; lng: number }
  posts: Post[]
  className?: string
  children?: (focusOnMarker: () => void) => ReactNode
}

const MapViewer = ({ isDenied, location, posts, className, children }: MapViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const userMarkerRef = useRef<naver.maps.Marker | null>(null)
  const searchRangeRef = useRef<naver.maps.Circle | null>(null)
  const clusterRef = useRef<any>(null)
  const postMarkerRefs = useRef<naver.maps.Marker[]>([])
  const { map } = useMap({ initLocation: location, mapRef })

  useEffect(() => {
    if (!map.current) {
      return
    }

    // 유저 마커 생성
    if (!userMarkerRef.current) {
      userMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.lat, location.lng),
        map: map.current,
        icon: {
          content: `<div class="size-6 bg-red-500 border-4 border-white rounded-full" />`,
          anchor: new window.naver.maps.Point(12, 12),
        },
      })
    }

    // 유저 주위 메시지 탐색 범위 생성
    if (!searchRangeRef.current) {
      searchRangeRef.current = new naver.maps.Circle({
        map: map.current,
        center: new naver.maps.LatLng(location.lat, location.lng),
        radius: 500,
        fillColor: "rgba(0, 230, 0, 0.1)",
        strokeColor: "rgba(0, 230, 0, 0.1)",
        strokeWeight: 1,
      })
    }

    // 클러스터링 객체 생성
    if (!clusterRef.current) {
      // @ts-ignore
      clusterRef.current = new window.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 18,
        map: map.current,
        markers: postMarkerRefs.current,
        gridSize: 500,
        icons: htmlClusterMarkers,
        indexGenerator: [10, 50, 100, 500, 1000],
        stylingFunction: (clusterMarker: any, count: number) => {
          if (clusterMarker) {
            const firstChild = clusterMarker.getElement().querySelector("div:first-child")
            if (firstChild) {
              firstChild.innerHTML = count
              firstChild.classList.add("flex", "items-center", "justify-center", "text-lg")
            }
          }
        },
      })
    }

    const handleZoomChange = () => {
      if (!map.current) {
        return
      }

      // 지도 레벨이 10보다 작아지면, 클러스터가 보이지 않도록 설정
      const zoomLevel = map.current.getZoom()
      clusterRef.current.setMap(zoomLevel < 10 ? null : map.current)
    }

    // 줌 레벨이 특정 레벨 이상이 되면 마커가 보이지 않도록 이벤트 추가
    const zoomChangeListener = naver.maps.Event.addListener(
      map.current,
      "zoom_changed",
      handleZoomChange,
    )

    return () => {
      naver.maps.Event.removeListener(zoomChangeListener)
    }
  }, [map.current])

  useEffect(() => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setVisible(!isDenied)
    }

    if (searchRangeRef.current) {
      searchRangeRef.current.setVisible(!isDenied)
    }
  }, [isDenied])

  useEffect(() => {
    if (isDenied) {
      return
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(location)
    }

    if (searchRangeRef.current) {
      searchRangeRef.current.setCenter(location)
    }

    focusOnMarker()
  }, [location])

  useEffect(() => {
    if (!map.current) {
      return
    }

    postMarkerRefs.current.forEach((marker) => marker.setMap(null))
    postMarkerRefs.current = []

    for (const post of posts) {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(post.lat, post.lng),
        map: map.current,
        icon: {
          content: `<div class="size-8 bg-blue-400/40 rounded-full" />`,
          anchor: new window.naver.maps.Point(12, 12),
        },
      })
      // 마커 클릭 이벤트 추가
      naver.maps.Event.addListener(marker, "click", () => {
        console.log("마커 클릭! 위치: " + marker.getPosition())
      })

      postMarkerRefs.current.push(marker)
    }

    clusterRef.current.setMarkers(postMarkerRefs.current)
  }, [posts])

  const focusOnMarker = () => {
    map.current?.setCenter(new window.naver.maps.LatLng(location.lat, location.lng))
  }

  return (
    <div ref={mapRef} className={className}>
      {children?.(focusOnMarker)}
    </div>
  )
}

export default MapViewer
