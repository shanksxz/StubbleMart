"use client"
import { motion } from "framer-motion"
export default function ProgressBar({ progress, color }: { progress: number, color: string }) {
    return (
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </div>
    )
}
