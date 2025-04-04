import useMap from "@/features/map/hooks/useMap"
import { Point } from "@/features/post/types/post"
import usePostStore from "@/store/usePostStore"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react"
import htmlClusterMarkers from "../constants"
import { LatLng } from "../types/map"

interface MapViewerProps {
  isLocationPermissionGranted: boolean
  location: LatLng
  points: Point[]
  className?: string
  setIsStoppedWatching: Dispatch<SetStateAction<boolean>>
  children?: (focusOnMarker: () => void) => ReactNode
}

const MapViewer = ({
  isLocationPermissionGranted,
  location,
  points,
  className,
  setIsStoppedWatching,
  children,
}: MapViewerProps) => {
  const { mapRef } = useMap({
    initLocation: location,
    config: {
      mapDiv: "map",
      mapOptions: {
        zoom: 16,
      },
    },
  })

  const userMarkerRef = useRef<naver.maps.Marker | null>(null)
  const searchRangeRef = useRef<naver.maps.Circle | null>(null)
  const clusterRef = useRef<any>(null)
  const postMarkerRefs = useRef<naver.maps.Marker[]>([])
  const { setType, setPostId, setClusterGrid, setIsDrawerOpen } = usePostStore()

  useEffect(() => {
    if (!mapRef.current || !window.naver?.maps) {
      return
    }

    // 유저 마커 생성
    if (!userMarkerRef.current) {
      userMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.lat, location.lng),
        map: mapRef.current,
        icon: {
          content: `<div class="size-6 bg-rose-400 border-4 border-white rounded-full" />`,
          anchor: new window.naver.maps.Point(12, 12),
        },
        visible: isLocationPermissionGranted,
      })
    }

    // 유저 주위 게시글 탐색 범위 생성
    if (!searchRangeRef.current) {
      searchRangeRef.current = new window.naver.maps.Circle({
        map: mapRef.current,
        center: new window.naver.maps.LatLng(location.lat, location.lng),
        radius: 500,
        fillColor: "rgba(0, 230, 0, 0.1)",
        strokeColor: "rgba(0, 230, 0, 0.1)",
        strokeWeight: 1,
        visible: isLocationPermissionGranted,
      })
    }

    // 클러스터링 객체 생성
    if (!clusterRef.current && window.MarkerClustering) {
      clusterRef.current = new window.MarkerClustering({
        averageCenter: true,
        minClusterSize: 2,
        maxZoom: 21,
        map: mapRef.current,
        markers: postMarkerRefs.current,
        gridSize: 300,
        icons: htmlClusterMarkers,
        indexGenerator: [10, 50, 100, 500, 1000],
        stylingFunction: (clusterMarker: any, count: number) => {
          if (clusterMarker) {
            const firstChild = clusterMarker
              .getElement()
              .querySelector("div:first-child")
            if (firstChild) {
              firstChild.innerHTML = count
              firstChild.classList.add(
                "flex",
                "items-center",
                "justify-center",
                "text-lg",
              )
            }
          }
        },
      })
    }

    const handleZoomChange = () => {
      if (!mapRef.current || !clusterRef.current) {
        return
      }

      const zoomLevel = mapRef.current.getZoom()
      clusterRef.current.setMarkers(
        zoomLevel < 15 ? [] : postMarkerRefs.current,
      )
    }

    const handleDragend = () => {
      if (!mapRef.current || !clusterRef.current) {
        return
      }

      clusterRef.current._clusters.forEach((cluster: any) => {
        cluster._clusterMarker.eventTarget.onclick = () => {
          setType("cluster")
          setClusterGrid([
            {
              lat: cluster._clusterBounds._sw._lat,
              lng: cluster._clusterBounds._sw._lng,
            },
            {
              lat: cluster._clusterBounds._ne._lat,
              lng: cluster._clusterBounds._ne._lng,
            },
          ])
          setIsDrawerOpen(true)
          setIsStoppedWatching(true)
        }
      })
    }

    const zoomChangeListener = window.naver.maps.Event.addListener(
      mapRef.current,
      "zoom_changed",
      handleZoomChange,
    )
    const dragendListener = window.naver.maps.Event.addListener(
      mapRef.current,
      "idle",
      handleDragend,
    )

    // 마커의 위치로 카메라 이동
    focusOnMarker()

    return () => {
      window.naver.maps.Event.removeListener(zoomChangeListener)
      window.naver.maps.Event.removeListener(dragendListener)
    }
  }, [mapRef.current])

  useEffect(() => {
    if (!window.naver?.maps) {
      return
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setVisible(isLocationPermissionGranted)
    }

    if (searchRangeRef.current) {
      searchRangeRef.current.setVisible(isLocationPermissionGranted)
    }
  }, [isLocationPermissionGranted])

  useEffect(() => {
    if (!window.naver?.maps || !isLocationPermissionGranted) {
      return
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(location)
    }

    if (searchRangeRef.current) {
      searchRangeRef.current.setCenter(location)
    }
  }, [location])

  useEffect(() => {
    if (!mapRef.current || !window.naver?.maps) {
      return
    }

    postMarkerRefs.current.forEach((marker) => marker.setMap(null))
    postMarkerRefs.current = []

    for (const point of points) {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(point.lat, point.lng),
        map: mapRef.current,
        icon: {
          content: `<div class="flex justify-center items-center text-lg size-8 bg-em-black/40 rounded-full text-white hover:bg-em-black">1</div>`,
          anchor: new window.naver.maps.Point(12, 12),
        },
      })

      // 마커 클릭 이벤트 추가
      window.naver.maps.Event.addListener(marker, "click", () => {
        setType("marker")
        setPostId(point.id)
        setIsDrawerOpen(true)
        setIsStoppedWatching(true)
      })
      postMarkerRefs.current.push(marker)
    }

    if (clusterRef.current) {
      clusterRef.current.setMarkers(postMarkerRefs.current)

      // 클러스터가 바로 반영 되도록 강제로 redraw
      clusterRef.current._redraw()
      clusterRef.current._clusters.forEach((cluster: any) => {
        cluster._clusterMarker.eventTarget.onclick = () => {
          setType("cluster")
          setClusterGrid([
            {
              lat: cluster._clusterBounds._ne._lat,
              lng: cluster._clusterBounds._ne._lng,
            },
            {
              lat: cluster._clusterBounds._sw._lat,
              lng: cluster._clusterBounds._sw._lng,
            },
          ])
          setIsDrawerOpen(true)
          setIsStoppedWatching(true)
        }
      })
    }
  }, [points])

  const focusOnMarker = () => {
    if (!mapRef.current || !window.naver?.maps) {
      return
    }

    mapRef.current.panTo(
      new window.naver.maps.LatLng(location.lat, location.lng),
    )
  }

  return (
    <div id="map" className={className}>
      {children?.(focusOnMarker)}
    </div>
  )
}

export default React.memo(MapViewer)
