export type ClusterDetail = {
  text: string
  tag: string
}

export type Cluster = {
  id: string
  title: string
  details: ClusterDetail[]
}

export const clusters: Cluster[] = [
  {
    id: "predictive",
    title: "Predictive Intelligence Systems",
    details: [
      {
        text: "Architected supervised learning pipelines",
        tag: "4 Applied Projects"
      },
      {
        text: "Model validation & optimization workflows",
        tag: "Production Prototype"
      },
      {
        text: "Feature engineering & data conditioning",
        tag: "100k+ Dataset Handling"
      }
    ]
  },
  {
    id: "distributed",
    title: "Distributed Application Architecture",
    details: [
      {
        text: "RESTful API systems with scalable service boundaries",
        tag: "3 Full-Stack Deployments"
      },
      {
        text: "Authentication, authorization, and state management",
        tag: "Cloud Hosted"
      },
      {
        text: "Database architecture and performance-first data access",
        tag: "MERN Production Build"
      }
    ]
  },
  {
    id: "data",
    title: "Data Infrastructure Engineering",
    details: [
      {
        text: "ETL workflow construction for analytics-readiness",
        tag: "Business Dashboard"
      },
      {
        text: "SQL query optimization and indexing strategy",
        tag: "40% Faster Queries"
      },
      {
        text: "Real-time KPI visualization pipelines",
        tag: "Large-Scale Data Handling"
      }
    ]
  },
  {
    id: "deployment",
    title: "Production & Deployment Orchestration",
    details: [
      {
        text: "Dockerized applications for reproducible environments",
        tag: "Production Setup"
      },
      {
        text: "CI/CD workflow integration and release discipline",
        tag: "Automated Pipelines"
      },
      {
        text: "Cloud deployment across modern hosting platforms",
        tag: "Team Collaboration"
      }
    ]
  },
  {
    id: "optimization",
    title: "Algorithmic Optimization & Performance",
    details: [
      {
        text: "Execution profiling and algorithmic complexity reduction",
        tag: "Performance Focus"
      },
      {
        text: "Latency and memory-aware implementation patterns",
        tag: "Scalable Runtime"
      },
      {
        text: "Benchmark-driven optimization loops",
        tag: "Production Readiness"
      }
    ]
  }
]