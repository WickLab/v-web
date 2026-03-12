import PageShell from "@/components/ui/PageShell"

import Hero from "@/components/Home/Hero"
import ProfessionalSummary from "@/components/Home/ProfessionalSummary"
import WhatIBring from "@/components/Home/WhatIBring"
import WorkProcess from "@/components/Home/WorkProcess"
import StrategicCapabilities from "@/components/Home/StrategicCapabilities"
import MyThinkingFramework from "@/components/Home/MyThinkingFramework"
import FeaturedProjects from "@/components/Home/FeaturedProjects"
import NewsletterSlider from "@/components/Home/NewsletterSlider"
import Testimonials from "@/components/Home/Testimonials"
import ResumeCTA from "@/components/Home/ResumeCTA"

export default function HomePage() {
  return (
    <PageShell>

      <Hero />

      <ProfessionalSummary />

      <WhatIBring />

      <WorkProcess />

      <StrategicCapabilities />

      <MyThinkingFramework />

      <FeaturedProjects />

      <NewsletterSlider />

      <Testimonials />

      <ResumeCTA />

    </PageShell>
  )
}