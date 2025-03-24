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
    if (!map.current || userMarkerRef.current || searchRangeRef.current) {
      return
    }

    userMarkerRef.current = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(location.lat, location.lng),
      map: map.current,
      icon: {
        content: `<div class="size-6 bg-red-500 border-4 border-white rounded-full" />`,
        anchor: new window.naver.maps.Point(12, 12),
      },
    })

    searchRangeRef.current = new naver.maps.Circle({
      map: map.current,
      center: new naver.maps.LatLng(location.lat, location.lng),
      radius: 500,
      fillColor: "rgba(0, 0, 0, 0.08)",
      strokeColor: "rgba(0, 0, 0, 0.08)",
      strokeWeight: 1,
    })
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
          content: `<div class="size-8 bg-blue-400/20 rounded-full" />`,
          anchor: new window.naver.maps.Point(12, 12),
        },
      })
      postMarkerRefs.current.push(marker)
    }

    // @ts-ignore
    clusterRef.current = new window.MarkerClustering({
      minClusterSize: 2,
      maxZoom: 18,
      map: map.current,
      markers: postMarkerRefs.current,
      gridSize: 100,
      icons: htmlClusterMarkers,
      indexGenerator: [30, 100, 200, 500, 1000],
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
