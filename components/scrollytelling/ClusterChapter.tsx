"use client"

import { Cluster } from "@components/scrollytelling/clusters"

type Props = {
  cluster: Cluster
}

export default function ClusterChapter({ cluster }: Props) {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-xl space-y-6">
        <h2 className="text-3xl font-bold">{cluster.title}</h2>

        <ul className="space-y-4">
          {cluster.details.map((detail, i) => (
            <li key={i} className="flex justify-between text-sm text-white/80">
              <span>{detail.text}</span>
              <span className="text-xs text-indigo-400">{detail.tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}