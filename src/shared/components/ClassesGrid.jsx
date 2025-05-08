"use client"

import { motion } from "motion/react"
import ClassCard from "./ClassCard"

export default function ClassesGrid({ classes }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {classes.map((classItem, index) => (
        <ClassCard key={classItem.id} classItem={classItem} index={index} />
      ))}
    </motion.div>
  )
}
