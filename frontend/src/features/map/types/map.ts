export interface LatLng {
  lat: number
  lng: number
}

export interface NaverMapConstructorParam {
  mapDiv: string | HTMLElement
  mapOptions?: naver.maps.MapOptions
}
