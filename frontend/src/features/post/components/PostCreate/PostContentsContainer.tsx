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
      <EmSection.Header
        title="❤️ 속마음을 남겨 주세요."
        description="글을 작성하고, 음악을 추가할 수 있어요!"
      />

      <div
        className={`flex items-center justify-center h-20 gap-2 border rounded-lg cursor-pointer border-em-gray-md ${formData.title ? "bg-em-white" : "bg-em-gray-sm/30  border-dashed"}`}
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
            <ListMusicIcon className="stroke-em-black/30" />
            <p className="text-em-black/30">게시글에 음악 추가하기</p>
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
          placeholder="지금 어떤 생각을 하고 계신가요?"
          className="h-full placeholder-em-black/30"
          onTextChange={handleTextChange}
          textState={textState}
        />
      </div>
    </EmSection>
  )
}
export default memo(PostContentsContainer)
