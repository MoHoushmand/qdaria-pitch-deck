import type React from "react"
import {
  type LucideIcon,
  Home,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Users,
  Rocket,
  DollarSign,
  Mail,
  Zap,
  Briefcase,
  Atom,
  TrendingUp,
  Layers,
  Package,
  FlaskConical,
  Milestone,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export interface SlideData {
  slug: string
  title: string
  navTitle: string
  icon: LucideIcon
  content: React.ReactNode
}

// --- Reusable Slide Wrappers ---
const SlideContentWrapper: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({
  title,
  children,
  className,
}) => (
  <div className={`flex flex-col items-center justify-center h-full w-full p-8 md:p-12 text-center ${className}`}>
    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary">{title}</h1>
    <div className="w-full max-w-5xl">{children}</div>
  </div>
)

const TwoColumnContent: React.FC<{
  title: string
  left: React.ReactNode
  right: React.ReactNode
  className?: string
}> = ({ title, left, right, className }) => (
  <div className={`flex flex-col h-full w-full p-8 md:p-12 ${className}`}>
    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary text-center">{title}</h1>
    <div className="flex-grow grid md:grid-cols-2 gap-8 items-center">
      <div className="text-lg md:text-xl space-y-4">{left}</div>
      <div className="flex items-center justify-center">{right}</div>
    </div>
  </div>
)

// --- Custom Components for Slides ---

// For "Problem" Slide
const ComputationalGrowthChart = () => {
  const chartData = [
    { year: 2020, classical: 100, problem: 150 },
    { year: 2022, classical: 200, problem: 400 },
    { year: 2024, classical: 350, problem: 1200, quantum: 1000 },
    { year: 2026, classical: 500, problem: 4000, quantum: 10000 },
    { year: 2028, classical: 650, problem: 12000, quantum: 100000 },
  ]
  return (
    <ChartContainer
      config={{
        classical: { label: "Classical Computing", color: "hsl(var(--secondary-foreground))" },
        problem: { label: "Problem Complexity", color: "hsl(var(--destructive))" },
        quantum: { label: "Qdaria Quantum", color: "hsl(var(--primary))" },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}>
            <Label value="Relative Power" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
          </YAxis>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="classical" stroke="var(--color-classical)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="problem" stroke="var(--color-problem)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="quantum" stroke="var(--color-quantum)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// For "Market" Slide
const MarketGrowthChart = () => {
  const chartData = [
    { year: "2024", size: 1.1 },
    { year: "2026", size: 4.8 },
    { year: "2028", size: 13.2 },
    { year: "2030", size: 39.6 },
  ]
  return (
    <ChartContainer
      config={{ size: { label: "Market Size ($B)", color: "hsl(var(--primary))" } }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.5)" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}B`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="size" fill="var(--color-size)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// For "Technology" Slide
const TechStackDiagram = () => {
  const layers = [
    { icon: FlaskConical, title: "Application Layer", desc: "Industry-specific solutions (Finance, Pharma, AI)" },
    { icon: Package, title: "Algorithm Layer (Qdaria Solve™)", desc: "Proprietary quantum & hybrid algorithms" },
    {
      icon: Layers,
      title: "Control & Compilation Layer",
      desc: "Noise mitigation, error correction, circuit optimization",
    },
    { icon: Cpu, title: "Hardware Layer (Qdaria QPU)", desc: "Novel [Photonic] Qubit Architecture" },
  ]
  return (
    <div className="space-y-2 w-full max-w-2xl mx-auto">
      {layers.map((layer, index) => (
        <Card
          key={layer.title}
          className="bg-slate-800/50 border-slate-700 p-4 flex items-center gap-4 transition-all hover:border-primary/70 hover:scale-105"
        >
          <layer.icon className="h-10 w-10 shrink-0 text-primary" />
          <div>
            <h3 className="font-semibold text-lg text-left">{layer.title}</h3>
            <p className="text-sm text-slate-300 text-left">{layer.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

// For "Roadmap" Slide
const RoadmapTimeline = () => {
  const items = [
    { date: "Q4 [Year]", title: "Alpha of Qdaria Cloud™", desc: "Initial access for select partners.", status: "done" },
    { date: "Q2 [Year+1]", title: "Launch Qdaria Solve™", desc: "Targeting financial optimization.", status: "done" },
    {
      date: "Q4 [Year+1]",
      title: "[X] Qubit Milestone",
      desc: "Achieve target with improved coherence.",
      status: "current",
    },
    {
      date: "[Year+2]",
      title: "Expand to New Verticals",
      desc: "Materials science and drug discovery.",
      status: "todo",
    },
    { date: "[Year+3]", title: "Fault-Tolerant QPU", desc: "Demonstrate first logical qubit.", status: "todo" },
  ]
  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`relative flex items-center mb-8 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? "text-right" : "text-left"}`}>
            <p className="font-bold text-primary">{item.date}</p>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="text-sm text-slate-300">{item.desc}</p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === "done"
                  ? "bg-green-500"
                  : item.status === "current"
                    ? "bg-cyan-500 animate-pulse"
                    : "bg-slate-600"
              }`}
            >
              <Milestone className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Slide Definitions ---
export const slides: SlideData[] = [
  {
    slug: "cover",
    title: "Qdaria",
    navTitle: "Cover",
    icon: Atom,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-900/30">
        <Atom size={128} className="mb-8 text-cyan-400 animate-pulse" />
        <h1 className="text-7xl md:text-8xl font-bold mb-4">Qdaria</h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-8">The Quantum Leap for Complex Computation</p>
        <p className="text-xl text-slate-400">Revolutionizing industries with quantum-inspired solutions.</p>
      </div>
    ),
  },
  {
    slug: "introduction",
    title: "Welcome to Qdaria",
    navTitle: "Introduction",
    icon: Home,
    content: (
      <SlideContentWrapper title="Welcome to Qdaria">
        <p className="text-xl md:text-2xl mb-6">
          We are at the forefront of the quantum revolution, developing accessible and powerful quantum computing
          solutions to tackle the world's most challenging problems.
        </p>
        <p className="text-xl md:text-2xl mb-12">
          Our mission is to <strong className="text-cyan-400">democratize quantum power</strong>, unlocking
          unprecedented computational capabilities for businesses and researchers alike.
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 w-full max-w-5xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="items-center pb-4">
              <div className="p-3 rounded-full bg-cyan-500/20 mb-3">
                <Lightbulb size={32} className="text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-center text-slate-100">Pioneering Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-300">
                Pushing the boundaries of quantum science to create next-generation hardware and algorithms.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="items-center pb-4">
              <div className="p-3 rounded-full bg-cyan-500/20 mb-3">
                <Users size={32} className="text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-center text-slate-100">Democratizing Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-300">
                Making quantum computing understandable, usable, and available to a wider audience through intuitive
                platforms.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="items-center pb-4">
              <div className="p-3 rounded-full bg-cyan-500/20 mb-3">
                <TrendingUp size={32} className="text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-center text-slate-100">Driving Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-300">
                Focusing on real-world applications that solve complex challenges and create transformative value across
                industries.
              </p>
            </CardContent>
          </Card>
        </div>
      </SlideContentWrapper>
    ),
  },
  {
    slug: "problem",
    title: "The Computational Wall",
    navTitle: "The Problem",
    icon: AlertTriangle,
    content: (
      <TwoColumnContent
        title="The Computational Wall"
        left={
          <>
            <p>
              Classical computers are hitting their limits. Many critical problems remain unsolvable due to their
              <strong className="text-amber-400"> exponential complexity</strong>.
            </p>
            <p className="mt-4">
              The gap between what we need to compute and what we can compute is widening. This is where quantum
              computing becomes not just an advantage, but a necessity.
            </p>
          </>
        }
        right={<ComputationalGrowthChart />}
      />
    ),
  },
  {
    slug: "solution",
    title: "Quantum Power, Unleashed",
    navTitle: "Our Solution",
    icon: Lightbulb,
    content: (
      <SlideContentWrapper title="Quantum Power, Unleashed">
        <p>
          Qdaria provides a hybrid quantum-classical platform that delivers significant speedups for specific
          computational tasks. We bridge the gap between today's NISQ-era devices and practical, real-world
          applications.
        </p>
        <p className="mt-4 font-semibold text-cyan-400">
          Our approach focuses on: Quantum-Inspired Algorithms, Custom Hardware Integration, and User-Friendly Software.
        </p>
        <Zap size={96} className="mx-auto mt-8 text-green-500" />
      </SlideContentWrapper>
    ),
  },
  {
    slug: "technology",
    title: "Our Quantum Architecture",
    navTitle: "Technology",
    icon: Cpu,
    content: (
      <SlideContentWrapper title="Our Quantum Architecture">
        <p className="mb-8 max-w-3xl mx-auto">
          Our full-stack approach ensures seamless integration and optimal performance, from the fundamental qubit to
          the end-user application.
        </p>
        <TechStackDiagram />
      </SlideContentWrapper>
    ),
  },
  {
    slug: "market",
    title: "The Quantum Leap Market",
    navTitle: "Market",
    icon: TrendingUp,
    content: (
      <TwoColumnContent
        title="The Quantum Leap Market"
        left={
          <>
            <p>
              The quantum computing market is experiencing explosive growth, projected to reach nearly{" "}
              <strong className="text-cyan-400">$40 Billion by 2030</strong>.
            </p>
            <p className="mt-4">
              Early adopters in finance, pharmaceuticals, and logistics are already seeking quantum advantages. Qdaria
              is perfectly positioned to capture this demand by providing accessible, results-driven solutions.
            </p>
          </>
        }
        right={<MarketGrowthChart />}
      />
    ),
  },
  {
    slug: "products",
    title: "Qdaria Offerings",
    navTitle: "Products",
    icon: Briefcase,
    content: (
      <SlideContentWrapper title="Qdaria Offerings">
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-slate-800 rounded-lg">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Qdaria Cloud™</h3>
            <p>
              Access our cutting-edge quantum processors via a secure, scalable cloud platform. Pay-as-you-go and
              subscription models available.
            </p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Qdaria Solve™</h3>
            <p>
              Proprietary quantum algorithms and software libraries tailored for specific industry problems (e.g.,
              optimization, simulation).
            </p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg md:col-span-2">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Qdaria Consult™</h3>
            <p>
              Expert consulting services to help businesses identify quantum use cases, develop custom solutions, and
              integrate quantum computing into their workflows.
            </p>
          </div>
        </div>
      </SlideContentWrapper>
    ),
  },
  {
    slug: "team",
    title: "The Minds Behind Qdaria",
    navTitle: "Team",
    icon: Users,
    content: (
      <SlideContentWrapper title="The Minds Behind Qdaria">
        <p>
          Our team comprises world-class quantum physicists, engineers, and business leaders with decades of experience
          from [Placeholder: Top Universities/Companies].
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-slate-800 rounded-lg">
              <img
                src={`/diverse-team-member.png?height=100&width=100&query=team+member+${i}+avatar`}
                alt={`Team Member ${i}`}
                className="w-24 h-24 rounded-full mx-auto mb-2 bg-slate-700"
              />
              <h4 className="text-xl font-semibold">Dr. Placeholder Name {i}</h4>
              <p className="text-cyan-400">Role (e.g., CEO & Quantum Physicist)</p>
            </div>
          ))}
        </div>
      </SlideContentWrapper>
    ),
  },
  {
    slug: "roadmap",
    title: "Our Journey Ahead",
    navTitle: "Roadmap",
    icon: Rocket,
    content: (
      <SlideContentWrapper title="Our Journey Ahead">
        <p className="mb-8">We have a clear vision and a phased approach to delivering quantum value.</p>
        <RoadmapTimeline />
      </SlideContentWrapper>
    ),
  },
  {
    slug: "ask",
    title: "Join Us",
    navTitle: "The Ask",
    icon: DollarSign,
    content: (
      <SlideContentWrapper title="Join Us in Building the Future">
        <p>
          We are seeking <strong className="text-cyan-400">[Placeholder: $X Million]</strong> in seed funding to:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-6 text-left max-w-md mx-auto">
          <li>Scale our engineering team.</li>
          <li>Expand our quantum hardware capabilities.</li>
          <li>Accelerate product development and go-to-market strategy.</li>
        </ul>
        <p className="mt-8">Become a part of the quantum revolution with Qdaria.</p>
      </SlideContentWrapper>
    ),
  },
  {
    slug: "contact",
    title: "Get in Touch",
    navTitle: "Contact",
    icon: Mail,
    content: (
      <SlideContentWrapper title="Get in Touch">
        <p>Let's discuss how Qdaria can power your next breakthrough.</p>
        <div className="mt-8 text-xl space-y-4">
          <p>
            Email:{" "}
            <a href="mailto:info@qdaria.com" className="text-cyan-400 hover:underline">
              info@qdaria.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://qdaria.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              qdaria.com
            </a>{" "}
            (Placeholder)
          </p>
          <p>
            LinkedIn: <span className="text-cyan-400">linkedin.com/company/qdaria</span> (Placeholder)
          </p>
        </div>
      </SlideContentWrapper>
    ),
  },
]
