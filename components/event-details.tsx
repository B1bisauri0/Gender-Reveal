"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

const details = [
  {
    icon: Calendar,
    label: "Fecha",
    value: "Sábado 2 de Mayo 2026",
  },
  {
    icon: Clock,
    label: "Hora",
    value: "10:00 AM",
  },
  {
    icon: MapPin,
    label: "Lugar",
    value: "Mall San Pedro (Ejemplo)",
  },
]

export function EventDetails() {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
            Detalles del Evento
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-16 h-px bg-primary/30" />
            <span className="text-primary">✦</span>
            <span className="w-16 h-px bg-secondary/30" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 w-16 h-16 bg-accent/50 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center shadow-sm">
                  <detail.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {detail.label}
              </p>
              <p className="font-serif text-lg md:text-xl text-foreground">
                {detail.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Ubicación
          </p>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border">
            
            {/* MAPA */}
            <iframe
              src="https://www.google.com/maps?q=Condominio+Oásis+de+San+José+San+Sebastián&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-[300px] md:h-[400px] grayscale hover:grayscale-0 transition duration-500"
            />

            {/* OVERLAY SUAVE */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* BOTONES */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            
            {/* GOOGLE MAPS */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mall+San+Pedro"
              target="_blank"
              className="px-6 py-3 rounded-full bg-primary text-white text-sm shadow-md hover:scale-105 transition"
            >
              Abrir en Google Maps
            </a>

            {/* WAZE */}
            <a
              href="https://waze.com/ul?q=Condominio+Oásis+de+San+José+San+Sebastián"
              target="_blank"
              className="px-6 py-3 rounded-full border border-border text-sm hover:bg-accent transition"
            >
              Abrir en Waze
            </a>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            Juega con nosotros
          </motion.p>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* Boy */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-secondary/30 blur-2xl rounded-3xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative w-[220px] px-6 py-6 rounded-3xl bg-background border border-border shadow-lg text-center min-h-[140px] flex flex-col justify-center">
                <p className="text-secondary font-serif text-2xl italic mb-2">
                  Niño 💙
                </p>
                <p className="text-muted-foreground text-sm">
                  Trae
                </p>
                <p className="text-foreground font-medium">
                  Toallitas Húmedas
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground text-xl"
            >
              ✦
            </motion.div>

            {/* Girl */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-3xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative w-[220px] px-6 py-6 rounded-3xl bg-background border border-border shadow-lg text-center min-h-[140px] flex flex-col justify-center">
                <p className="text-primary font-serif text-2xl italic mb-2">
                  Niña 💗
                </p>
                <p className="text-muted-foreground text-sm">
                  Trae
                </p>
                <p className="text-foreground font-medium">
                  Pañales
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
