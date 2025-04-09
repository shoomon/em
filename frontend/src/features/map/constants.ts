const bgImage = "/assets/heart.svg"
const markerContents = `<div class="flex items-center justify-center animate-bounce text-sm opacity-65 text-em-white size-8 font-semibold" style="background:url(${bgImage});background-size:contain;"></div>`

const htmlClusterMarkers = [
  {
    content: markerContents,
    anchor: new window.naver.maps.Point(16, 16),
  },
  {
    content: markerContents,
    anchor: new window.naver.maps.Point(18, 18),
  },
  {
    content: markerContents,
    anchor: new window.naver.maps.Point(20, 20),
  },
  {
    content: markerContents,
    anchor: new window.naver.maps.Point(22, 22),
  },
  {
    content: markerContents,
    anchor: new window.naver.maps.Point(24, 24),
  },
]

export default htmlClusterMarkers
