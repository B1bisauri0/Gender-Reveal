"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RsvpSection() {
  const [selectedGuess, setSelectedGuess] = useState<"niña" | "niño" | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !selectedGuess) return

    setLoading(true)
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          guess: selectedGuess,
        }),
      })

      let data

      try {
        data = await res.json()
      } catch {
        data = { message: "Respuesta no válida del servidor" }
      }

      if (!res.ok) {
        console.error(data)
        throw new Error(data.message)
      }

      setSubmitted(true)
    } catch (error) {
      console.error(error)
      alert("Hubo un error 😢")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
            Confirma tu Asistencia
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-16 h-px bg-primary/30" />
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="w-16 h-px bg-secondary/30" />
          </div>
          <p className="text-muted-foreground">
            Y adivina... ¿Qué crees que será?
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3 text-center">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre"
                  className="w-full px-6 py-4 bg-background border border-border rounded-xl text-center text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
              </motion.div>

              {/* Gender guess */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 text-center">
                  Tu Predicción
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedGuess("niña")}
                    className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${
                      selectedGuess === "niña"
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className="text-4xl md:text-5xl mb-3">👶🏻</div>
                    <span className="font-serif text-xl md:text-2xl text-foreground">Niña</span>
                    <div className="mt-2">
                      <Heart className={`w-5 h-5 mx-auto transition-colors ${
                        selectedGuess === "niña" ? "text-primary fill-primary" : "text-muted-foreground/30"
                      }`} />
                    </div>
                    {selectedGuess === "niña" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGuess("niño")}
                    className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${
                      selectedGuess === "niño"
                        ? "border-secondary bg-secondary/10 shadow-lg shadow-secondary/20"
                        : "border-border bg-background hover:border-secondary/50"
                    }`}
                  >
                    <div className="text-4xl md:text-5xl mb-3">👶🏻</div>
                    <span className="font-serif text-xl md:text-2xl text-foreground">Niño</span>
                    <div className="mt-2">
                      <Heart className={`w-5 h-5 mx-auto transition-colors ${
                        selectedGuess === "niño" ? "text-secondary fill-secondary" : "text-muted-foreground/30"
                      }`} />
                    </div>
                    {selectedGuess === "niño" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-secondary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-secondary-foreground" />
                      </motion.div>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={!name || !selectedGuess || loading}
                  className="w-full py-6 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Confirmar Asistencia"}
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                ¡Gracias, {name}!
              </h3>
              <p className="text-muted-foreground mb-2">
                Tu asistencia ha sido confirmada.
              </p>
              <p className="text-foreground">
                Votaste por:{" "}
                <span className={`font-serif text-xl ${
                  selectedGuess === "niña" ? "text-primary" : "text-secondary"
                }`}>
                  {selectedGuess === "niña" ? "Niña" : "Niño"}
                </span>
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                ¡Nos vemos pronto para descubrir la sorpresa!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center gap-6">
            
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />

            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Heart className="w-5 h-5 text-primary fill-primary/70" />
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary/70" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
