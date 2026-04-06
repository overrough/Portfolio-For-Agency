"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  delay?: number
}

const Section = ({ children, id, className, delay = 0 }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={`py-24 md:py-40 relative ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default Section
