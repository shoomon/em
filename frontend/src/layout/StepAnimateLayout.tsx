import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"
import { useSearchParams } from "react-router-dom"

type StepAnimateLayoutProps = {
  children: ReactNode
}

const StepAnimateLayout = ({ children }: StepAnimateLayoutProps) => {
  const [searchParams] = useSearchParams()
  const step = searchParams.get("step")

  // 현재 step을 상태로 관리하여, 이전 컴포넌트가 사라진 후 새로운 컴포넌트를 보여줌

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        className="w-full h-full overflow-hidden"
        initial={{ opacity: 0, transform: "translateX(30px)" }}
        animate={{ opacity: 1, transform: "translateX(0px)" }}
        exit={{ opacity: 0, transform: "translateX(-30px)" }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default StepAnimateLayout
