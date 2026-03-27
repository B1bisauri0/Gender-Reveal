import { HeroSection } from "@/components/hero-section"
import { EventDetails } from "@/components/event-details"
import { CountdownTimer } from "@/components/countdown-timer"
import { RsvpSection } from "@/components/rsvp-section"
import { FooterSection } from "@/components/footer-section"

export default function GenderRevealInvitation() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <EventDetails />
      <CountdownTimer />
      <RsvpSection />
      <FooterSection />
    </main>
  )
}
