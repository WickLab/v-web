// data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "ads-plane-feeder",
    privateContent: true,
    title: "ADS Plane Feeder",
    tagline: "A 24/7 Raspberry Pi edge device for live aircraft telemetry ingestion and feeder monitoring.",
    category: "IoT / Edge Computing / Aviation Data",
    problem:
      "Aircraft continuously broadcast ADS-B telemetry, but receiving, decoding, and forwarding that data reliably from a low-cost local device requires stable hardware integration, secure networking, and continuous service monitoring.",
    solution:
      "Built a Raspberry Pi-based ADS-B feeder that captures 1090 MHz aircraft transponder signals using an SDR receiver, decodes them locally with Linux tools, and streams live telemetry to PlaneFinder through an automated, monitored, and remotely managed pipeline.",
    tech: [
      "Raspberry Pi 4",
      "Linux",
      "Python",
      "RTL-SDR",
      "dump1090-fa",
      "PlaneFinder pfclient",
      "Bash",
      "systemd",
      "cron",
      "Tailscale",
      "Streamlit"
    ],
    image: "/projects/planeADS-dashboard.png",
    github: "https://github.com/your-username/ads-plane-feeder",
    learnings: [
      "Linux system administration for headless edge devices",
      "Real-time telemetry ingestion and radio decoding workflows",
      "Network configuration and remote device management",
      "Service automation and operational observability"
    ],
    overview:
      "A Raspberry Pi-powered ADS-B feeder designed to run continuously as a lightweight IoT edge node. The system receives aircraft transponder broadcasts, decodes them locally, and forwards structured telemetry to global flight tracking services while exposing local health and performance visibility.",
    fullDetails: [
      "Integrated a 1090 MHz antenna, RTL-SDR receiver, and Raspberry Pi 4 to capture and process live aircraft broadcasts.",
      "Configured dump1090-fa for local decoding and pfclient for continuous telemetry forwarding to PlaneFinder.",
      "Implemented static IP networking, SSH access, UFW hardening, and Tailscale VPN for secure remote administration.",
      "Automated startup and recovery using systemd and cron-based watchdog checks to support stable 24/7 uptime.",
      "Monitored CPU usage, bandwidth, storage, uptime, and feeder health using Linux utilities and a lightweight Streamlit dashboard."
    ]
  },
  {
    id: "digital-wardrobe",
    privateContent: true,
    title: "Wardrobe - My Outfits",
    tagline: "A digital wardrobe planner for outfit organization, event styling, and AI-assisted clothing decisions.",
    category: "Fashion Tech / Product Design",
    problem:
      "Many users struggle to manage their wardrobe efficiently, repeat outfit planning manually, and make confident clothing choices for events without seeing what they already own in one structured system.",
    solution:
      "Designed a digital wardrobe platform that lets users organize clothes, build outfits, plan for events, manage hanger-based subscription tiers, and explore AI-assisted recommendations for what to wear or buy next.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Product Strategy"
    ],
    image: "/projects/ward.png",
    github: "https://github.com/your-username/digital-wardrobe",
    learnings: [
      "Subscription-first product modeling",
      "Fashion-oriented UX structuring",
      "State-driven inventory organization",
      "Feature packaging for tiered plans"
    ],
    overview:
      "A wardrobe management and outfit-planning product concept built around digital clothing organization, event-based recommendations, and tiered access. The project explores how fashion utility, AI guidance, and monetization can be combined into a consumer-friendly app experience.",
    fullDetails: [
      "Designed wardrobe inventory flows where users can add garments, categorize pieces, and visually manage their available clothing.",
      "Planned outfit-building features around event types, style intent, and user-owned combinations rather than generic recommendations.",
      "Structured monetization around tiered hanger limits, AI recommendations, and premium planning features.",
      "Created app flow concepts for adding clothing, managing hangers, selecting outfits, and tracking wardrobe usage over time.",
      "Focused on a user experience that balances practical wardrobe utility with modern fashion-tech product positioning."
    ]
  },
  {
    id: "digital-dreamers-shift-drop",
    title: "Digital Dreamers - Shift Drop",
    tagline: "A collaborative scheduling and shift handoff platform for smoother team operations.",
    category: "Business / Workforce Operations",
    problem:
      "Team shift transitions often lead to missing information, unclear accountability, and delays when handoff notes, schedule updates, and responsibilities are scattered across informal channels.",
    solution:
      "Created a shift-centric workflow platform that organizes assignments, handoff notes, timeline visibility, and operational accountability into a single structured interface.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/projects/drop-swift.png",
    github: "https://github.com/your-username/shift-drop",
    learnings: [
      "Workflow modeling for operational teams",
      "Role-based interface design",
      "Audit-friendly event tracking",
      "Handoff clarity in team environments"
    ],
    overview:
      "A scheduling and handoff workflow concept built to improve shift continuity. The platform focuses on reducing information loss between teams by making assignments, status updates, and handover notes easier to track and review.",
    fullDetails: [
      "Mapped the end-to-end shift lifecycle including assignment, active shift updates, handoff completion, and escalation cases.",
      "Designed separate workflow visibility for supervisors and staff members based on role-specific tasks and permissions.",
      "Added timeline-style logs to make operational history and ownership clearer across day-to-day activity.",
      "Focused the product around reducing shift confusion, missed updates, and informal communication gaps.",
      "Explored how a lightweight team platform can improve continuity in service, retail, and operations-heavy environments."
    ]
  },
  {
    id: "vending-machine",
    privateContent: true,
    title: "Vending Easier You",
    tagline: "A smart vending concept focused on easier product access, inventory visibility, and automated sales flow.",
    category: "IoT / Smart Retail",
    problem:
      "Traditional vending systems often provide limited stock visibility, weak customer interaction, and poor operational insight for refilling, maintenance, and product performance.",
    solution:
      "Designed a smarter vending experience that combines digital product display, purchase flow logic, inventory awareness, and operational visibility into a more modern self-service retail concept.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "IoT Concepts",
      "Embedded Systems",
      "Dashboard Design"
    ],
    image: "/projects/vending.png",
    github: "https://github.com/your-username/vending-machine",
    learnings: [
      "Retail automation thinking",
      "Self-service user flow design",
      "Inventory visibility concepts",
      "Physical-to-digital system mapping"
    ],
    overview:
      "A smart vending product concept that rethinks the vending machine as a connected retail touchpoint. The project explores how inventory status, product interaction, and operational visibility can be improved through better digital workflows and monitoring.",
    fullDetails: [
      "Outlined customer purchase flows for browsing, selecting, and confirming products in a self-service environment.",
      "Designed concepts for stock visibility and refill awareness to support better maintenance and operations planning.",
      "Explored the relationship between the machine interface, payment logic, and product-dispensing workflow.",
      "Considered how a connected dashboard could help operators monitor machine health and top-selling items.",
      "Positioned the project as a bridge between physical vending hardware and digital retail experience design."
    ]
  },
  {
    id: "greenloop",
    privateContent: true,
    title: "Bottlo - GreenLoop",
    tagline: "A recycling pickup and rewards platform for household waste collection and sustainability engagement.",
    category: "Sustainability / Circular Economy",
    problem:
      "Households often lack an easy and rewarding way to separate recyclable materials, schedule collection, and understand the value of what they dispose of.",
    solution:
      "Designed a recycling-first platform where users can add recyclable items, scan supported materials, request pickup, and receive value-based rewards through a structured sustainability workflow.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Map APIs",
      "Barcode Scanning Concepts",
      "Dashboard Design"
    ],
    image: "/projects/bottlo.png",
    github: "https://github.com/your-username/greenloop",
    learnings: [
      "Sustainability-driven product design",
      "Pickup workflow modeling",
      "Household-to-collector UX planning",
      "Reward-based engagement systems"
    ],
    overview:
      "A recycling collection and rewards app concept focused on improving how households handle recyclable waste. The platform connects item entry, pickup scheduling, collection agents, and value calculation into a practical circular-economy workflow.",
    fullDetails: [
      "Designed homeowner-side flows for adding recyclable items such as plastic bottles, glass, paper, aluminum, and coconut shells.",
      "Included concepts for barcode scanning on supported packaging to simplify item entry and improve speed.",
      "Planned pickup request workflows with address handling, collection tracking, and agent visit confirmation.",
      "Explored value calculation models where some materials are counted per item and others are assessed by weight at pickup.",
      "Positioned the product as a sustainability platform that combines convenience, environmental action, and reward-based participation."
    ]
  },
  {
    id: "elephant-ai-gps-tracking-belt",
    title: "Elephant AI GPS Tracking Belt",
    tagline: "A wildlife-focused GPS tracking concept for monitoring elephant movement, safety, and location intelligence.",
    category: "IoT / Wildlife Conservation / AI",
    problem:
      "Human-elephant conflict and limited real-time movement visibility make it difficult to monitor elephant behavior, respond early to risk, and support wildlife conservation teams with timely location intelligence.",
    solution:
      "Conceptualized a GPS-enabled elephant tracking belt that combines location data, monitoring logic, and mapping workflows to help conservation teams track elephant movement and respond more effectively.",
    tech: [
      "IoT",
      "GPS Tracking",
      "Embedded Systems",
      "Mapping APIs",
      "Python",
      "Data Visualization"
    ],
    image: "/projects/Elephant-GP.png",
    github: "https://github.com/your-username/elephant-gps-ai",
    learnings: [
      "Geo-data workflow thinking",
      "Wildlife-tech problem framing",
      "Sensor-to-dashboard architecture",
      "Conservation-oriented alert design"
    ],
    overview:
      "A wildlife technology concept aimed at improving elephant tracking through GPS data and monitoring tools. The project focuses on location awareness, movement interpretation, and conservation-friendly system design for real-world environmental challenges.",
    fullDetails: [
      "Designed a concept for a GPS-enabled tracking belt that could collect location data from elephants in the field.",
      "Explored how movement data could be visualized through maps, region markers, and route history review.",
      "Considered early-warning workflows for proximity, irregular movement, or entry into sensitive human-populated zones.",
      "Connected the idea to broader conservation goals including safer monitoring, response coordination, and data-informed habitat understanding.",
      "Framed the system as an applied IoT and analytics project with meaningful social and environmental impact."
    ]
  },
  {
    id: "self-driving-drone",
    privateContent: true,
    title: "Self Driving Drone",
    tagline: "An autonomous drone prototype for waypoint navigation, telemetry logging, and safer mission repeatability.",
    category: "Autonomous Systems / Robotics",
    problem:
      "Manual drone piloting can reduce consistency and repeatability in mission-based tasks, especially when a route must be followed accurately across multiple attempts.",
    solution:
      "Prototyped an autonomous drone workflow that focuses on waypoint execution, telemetry logging, and fail-safe behavior for more predictable mission performance.",
    tech: [
      "Python",
      "Autonomous Navigation",
      "Telemetry",
      "Control Systems",
      "OpenCV",
      "Embedded Logic"
    ],
    image: "/projects/drone-AI-self.png",
    github: "https://github.com/your-username/self-driving-drone",
    learnings: [
      "Waypoint-based mission planning",
      "Safety-aware autonomy design",
      "Telemetry review and iteration",
      "Control-loop thinking"
    ],
    overview:
      "An autonomous drone concept built around route repeatability, mission-state awareness, and post-flight analysis. The project explores how waypoint logic and telemetry tracking can support more reliable drone operations.",
    fullDetails: [
      "Planned waypoint-based autonomous movement with route sequencing and heading correction logic.",
      "Defined fail-safe and fallback states for unstable conditions such as signal loss or mission interruption.",
      "Structured telemetry capture for mission replay, debugging, and post-flight review.",
      "Explored how autonomy features could reduce manual inconsistency during repeated task execution.",
      "Positioned the project as an applied learning exercise in robotics, control systems, and autonomous workflows."
    ]
  },
  {
    id: "holographic-eye",
    privateContent: true,
    title: "Holographic Eye",
    tagline: "A futuristic interface concept blending spatial feedback, focus states, and immersive visual interaction.",
    category: "UI/UX Design / Spatial Interfaces",
    problem:
      "Conventional interfaces often rely on flat interaction patterns that do not fully express depth, attention, or immersive feedback in next-generation digital experiences.",
    solution:
      "Designed an experimental visual interface concept that uses motion, focus hierarchy, and spatial cues to simulate a more immersive and responsive interaction model.",
    tech: ["Three.js", "Framer Motion", "TypeScript", "UI Prototyping", "Motion Design"],
    image: "/projects/HOLO-AI-EYE.png",
    github: "https://github.com/your-username/holographic-eye",
    learnings: [
      "Human-centered motion design",
      "Depth-aware interaction concepts",
      "Experimental interface composition",
      "Visual hierarchy through movement"
    ],
    overview:
      "A conceptual spatial interface project exploring how futuristic visual systems could communicate state, depth, and responsiveness more effectively than traditional flat UI patterns.",
    fullDetails: [
      "Developed a visual interaction concept around focus, motion, glow, and layered feedback states.",
      "Explored how near/far hierarchy and animated transitions can improve perceived responsiveness and immersion.",
      "Used motion-first thinking to express attention changes and interface priority without relying only on text.",
      "Positioned the design as a speculative concept for future AR, holographic, or immersive interface systems.",
      "Focused on visual experimentation while maintaining clear structure and cognitive readability."
    ]
  },
  {
    id: "maths-tutor-program",
    title: "Maths Tutor Program",
    tagline: "An adaptive tutoring system for personalized math practice, progress tracking, and guided improvement.",
    category: "Education Technology",
    problem:
      "Students often learn mathematics at different speeds, but many tutoring systems do not adapt well to individual weaknesses, confidence levels, or progression needs.",
    solution:
      "Built an adaptive tutoring concept that supports level-based questions, learner progress tracking, and personalized recommendations for practice and improvement.",
    tech: ["TypeScript", "React", "Algorithms", "Data Tracking", "Educational UX"],
    image: "/projects/maths-class.png",
    github: "https://github.com/your-username/maths-tutor-program",
    learnings: [
      "Adaptive logic design",
      "Learning analytics thinking",
      "Feedback-driven user progression",
      "Educational workflow structuring"
    ],
    overview:
      "A personalized learning platform concept focused on helping students improve mathematics through guided progression, performance tracking, and dynamic content recommendations.",
    fullDetails: [
      "Designed level-based question flows that could increase or decrease difficulty depending on student performance.",
      "Created progress-tracking concepts to identify weak topics, repeated errors, and overall improvement patterns.",
      "Planned recommendation logic for follow-up exercises based on learner-specific performance data.",
      "Focused on making the experience supportive and structured rather than overwhelming for mixed skill levels.",
      "Positioned the project as an education-focused system combining adaptive logic with learner-centered feedback."
    ]
  },
  {
    id: "pareza-cleaning",
    title: "Pareza Cleaning",
    tagline: "A service business platform for cleaning bookings, requests, and operational scheduling visibility.",
    category: "Web Development / Service Operations",
    problem:
      "Manual cleaning bookings and customer requests can lead to scheduling confusion, fragmented communication, and poor visibility for both service teams and clients.",
    solution:
      "Developed a booking-centered platform that organizes service requests, scheduling flows, and operational clarity into a cleaner digital experience for a growing service business.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Forms", "Responsive Design"],
    image: "/projects/pareza.png",
    live: "https://your-live-demo-link.com",
    learnings: [
      "Service workflow design",
      "Customer journey mapping",
      "Operational clarity in booking systems",
      "Structured request management"
    ],
    overview:
      "A business website and operations-focused service platform designed to support booking requests, service presentation, and day-to-day scheduling visibility for a cleaning brand.",
    fullDetails: [
      "Structured booking forms with clear fields for customer intent, service type, and request details.",
      "Designed a service catalog experience that helps users understand offerings quickly and request the right service confidently.",
      "Mapped request-to-scheduling workflows to support smoother coordination on the operations side.",
      "Focused on making the interface trustworthy, clean, and conversion-oriented for service-based customers.",
      "Positioned the platform as a practical digital foundation for a scalable cleaning business."
    ]
  },
  {
    id: "dilsena-gem-exporter",
    title: "Dilsena Gem Exporter",
    tagline: "An export-facing gemstone catalog and buyer inquiry platform built for trust and clarity.",
    category: "Business / Entrepreneurial Projects",
    problem:
      "International buyers need confidence, product clarity, and easy inquiry pathways when evaluating gemstone exporters online, but many websites fail to present inventory and trust signals effectively.",
    solution:
      "Built an export-oriented presentation platform with a structured gem catalog, buyer-focused inquiry flows, and trust-building content that supports international business conversion.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Content Architecture"],
    image: "/projects/dilseana-gem.png",
    live: "https://your-live-demo-link.com",
    learnings: [
      "B2B trust-focused UX",
      "Export-ready content structuring",
      "Buyer conversion flow design",
      "Catalog presentation strategy"
    ],
    overview:
      "A gemstone exporter website concept designed to present product quality, communicate buyer trust, and support international inquiries through a clear digital experience.",
    fullDetails: [
      "Created structured inventory presentation ideas for showcasing gemstone categories and buyer-relevant quality information.",
      "Designed inquiry pathways that align with how international buyers evaluate and contact exporters.",
      "Focused on trust-building content such as clarity of presentation, brand story, and professional communication signals.",
      "Applied export-oriented information architecture to reduce confusion and improve buyer confidence.",
      "Positioned the site as a conversion-ready digital storefront for global gemstone trade visibility."
    ]
  },
  {
    id: "master-captain-web",
    title: "Master Captain Web",
    tagline: "A leadership-focused digital brand platform with modular structure and scalable storytelling.",
    category: "Web Development / Personal Brand",
    problem:
      "Growing personal or leadership brands often lack a structured digital presence that can clearly communicate identity, expertise, and future content expansion.",
    solution:
      "Developed a modular website foundation with reusable sections, narrative-driven content flow, and scalable architecture for a leadership-centered digital platform.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "CMS-ready Architecture"],
    image: "/projects/captain-web.png",
    github: "https://github.com/your-username/master-captain-web",
    learnings: [
      "Brand-system implementation",
      "Reusable section architecture",
      "Narrative web design",
      "Scalable content planning"
    ],
    overview:
      "A modular website project built to support a leadership-driven brand through strong structure, flexible sections, and a content model that can grow over time.",
    fullDetails: [
      "Designed reusable sections that support future content growth without requiring repeated redesign.",
      "Built a clear page narrative that guides users through identity, positioning, and action-oriented content blocks.",
      "Prepared the architecture for future CMS integration and analytics expansion.",
      "Focused on balancing visual presence with content scalability and storytelling clarity.",
      "Positioned the project as a long-term digital foundation rather than a one-off landing page."
    ]
  },
  {
    id: "lanka-harvest-hub",
    title: "LankaHarvest Hub",
    tagline: "An agricultural export platform connecting Sri Lankan farmers with Australian buyers.",
    category: "Web Development / AgriTech / Export",
    problem:
      "Many farmers lack direct visibility to international buyers, while buyers struggle to discover export-ready agricultural products through structured and trustworthy digital channels.",
    solution:
      "Developed a responsive export-platform concept that presents agricultural products clearly, simulates buyer inquiry workflows, and strengthens farmer-to-buyer visibility across borders.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    image: "/projects/lanka-harvest.png",
    github: "https://github.com/your-username/lanka-harvest-hub",
    live: "https://your-live-demo-link.com",
    learnings: [
      "Export-process storytelling",
      "Structured product presentation",
      "Cross-border buyer UX",
      "Scalable landing-page architecture"
    ],
    overview:
      "A portfolio-grade agricultural export platform designed to connect Sri Lankan producers with Australian buyers through clear product presentation, trust-building flows, and a modern responsive interface.",
    fullDetails: [
      "Created a responsive product structure to showcase agricultural categories and buyer-relevant details more clearly.",
      "Designed buyer-intent flows that simulate how international purchasers would explore and request products.",
      "Applied a clean information hierarchy to communicate export value, sourcing confidence, and supplier visibility.",
      "Used motion selectively to guide users through the story of the platform and improve readability.",
      "Positioned the project as a bridge between local producers and global market opportunity through digital access."
    ]
  }
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id) ?? null;
}