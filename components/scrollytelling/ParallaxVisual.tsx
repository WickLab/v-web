"use client"

import { Cluster } from "@components/scrollytelling/clusters"

type Props = {
  cluster: Cluster | null
}

export default function ParallaxVisual({ cluster }: Props) {

  if (!cluster) return null

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">

      <div className="relative w-[420px] h-[420px] rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl flex items-center justify-center">

        <div className="text-center px-8">
          <h3 className="text-xl font-semibold mb-3">
            {cluster.title}
          </h3>

          <p className="text-sm text-white/60">
            {cluster.details[0].text}
          </p>
        </div>

      </div>

    </div>
  )
}