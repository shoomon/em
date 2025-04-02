import EmDrawer from "@/components/drawer/EmDrawer"
import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import MusicItem from "@/features/music/components/MusicItem"
import MusicSelector from "@/features/music/components/MusicSelector"
import { Music } from "@/features/music/types/music"
import useDrawer from "@/hooks/useDrawer"
import { ListMusicIcon } from "lucide-react"
import { memo, useState } from "react"
import { usePostForm } from "../../contexts/PostFormContext"

const PostContentsContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { formData, handleMusicChange, updateFormData } = usePostForm()
  const { content: textState } = formData

  useDrawer({ drawerKey: "PostContentsInput", isOpen, setIsOpen })

  const handleTextChange = (text: string) => {
    updateFormData("content", text)
  }
  return (
    <EmSection className="h-full">
      <EmSection.Header title="✨ 속마음을 남겨주세요" />

      <div
        className={`flex items-center justify-center h-20 gap-2 border border-dashed rounded-lg cursor-pointer border-em-gray ${formData.title ? "bg-em-white" : "bg-em-gray-sm/40"}`}
        onClick={() => setIsOpen(true)}>
        {formData.title ? (
          <MusicItem
            music={{
              artistName: formData.artistName,
              title: formData.title,
              albumImageUrl: formData.albumImageUrl,
              spotifyAlbumUrl: formData.spotifyAlbumUrl,
            }}
            readOnly={true}
          />
        ) : (
          <>
            <ListMusicIcon className="stroke-em-gray" />
            <p className="text-em-gray">메시지에 음악 추가하기</p>
          </>
        )}
      </div>

      <EmDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <MusicSelector
          onSelect={(music: Music) => {
            handleMusicChange(music)
            setIsOpen(!isOpen)
          }}
        />
      </EmDrawer>

      <div className="h-full">
        <EmTextArea
          placeholder="현재 어떤 생각을 하고 있나요?"
          className="h-full"
          onTextChange={handleTextChange}
          textState={textState}
        />
      </div>
    </EmSection>
  )
}
export default memo(PostContentsContainer)
