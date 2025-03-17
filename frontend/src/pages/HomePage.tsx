import MapViewer from "@/components/map/MapViewer"
import { MailSearch, MapPinIcon, RotateCwIcon, SendIcon } from "lucide-react"

const HomePage = () => {
  return (
    <div className="relative h-[calc(100vh-7.5rem)]">
      <div className="absolute top-0 left-0 z-10 flex items-center w-full gap-2 p-3 bg-gradient-to-b from-em-white via-em-white/80 to-em-white/10">
        <MapPinIcon className="stroke-red-500" />
        <p className="font-semibold">서울 강남구 테헤란로 212</p>
      </div>

      <button className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 bg-white border rounded-lg shadow-md cursor-pointer top-12 left-1/2 border-neutral-200">
        <RotateCwIcon className="size-5" />
        <p className="text-sm font-semibold">메시지 재탐색</p>
      </button>

      <MapViewer className="relative h-full" />

      <button className="absolute z-10 p-2 bg-white border rounded-full shadow-md cursor-pointer bottom-8 right-4 border-neutral-200">
        <SendIcon />
      </button>

      <button className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 bg-white border rounded-lg shadow-md cursor-pointer bottom-8 left-1/2 border-neutral-200">
        <MailSearch className="size-5" />
        <p className="text-sm font-semibold">메세지 전체 보기</p>
      </button>
    </div>
  )
}

export default HomePage
