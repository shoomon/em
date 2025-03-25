import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"
import { useSearchParams } from "react-router-dom"

type StepAnimateLayoutProps = {
  children: ReactNode
}

const StepAnimateLayout = ({ children }: StepAnimateLayoutProps) => {
  const [searchParams] = useSearchParams()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={searchParams.get("step")}
        className="w-full h-full"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default StepAnimateLayout
