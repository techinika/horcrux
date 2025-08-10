'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

interface AnimatedWrapperProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      delay,
    },
  }),
}

export const AnimatedWrapper = ({ children, variants = defaultVariants, className, delay = 0 }: AnimatedWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
