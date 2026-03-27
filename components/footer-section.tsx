"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-8 h-px bg-primary/30" />
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
          <span className="w-8 h-px bg-secondary/30" />
        </div>
        
        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          Con amor,
        </p>
        <p className="font-serif text-3xl md:text-4xl text-foreground mb-8 italic">
          Los Futuros Papás
        </p>
        
        <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
          <span className="text-primary">♥</span>
          <span>Baby Coming Soon</span>
          <span className="text-secondary">♥</span>
        </div>
        
        <p className="text-muted-foreground/60 text-xs mt-8">
          Código de vestimenta: Blanco y tonos pastel
        </p>
      </motion.div>
    </footer>
  )
}

