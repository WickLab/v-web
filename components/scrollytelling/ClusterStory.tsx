"use client"

import { useEffect, useRef, useState } from "react"
import { clusters } from "./clusters"
import ClusterChapter from "./ClusterChapter"
import ParallaxVisual from "./ParallaxVisual"

export default function ClusterStory() {

  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            const index = refs.current.findIndex(
              el => el === entry.target
            )

            if (index !== -1) setActive(index)

          }
        })
      },
      { threshold: 0.5 }
    )

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()

  }, [])

  return (
    <section className="relative">

      <div className="grid md:grid-cols-2 gap-20">

        {/* Sticky Visual */}
        <div>
          <ParallaxVisual cluster={clusters[active]} />
        </div>

        {/* Scroll Chapters */}
        <div>
          {clusters.map((cluster, i) => (
            <div
              key={cluster.id}
              ref={(el) => (refs.current[i] = el)}
            >
              <ClusterChapter cluster={cluster} />
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}