'use client'

import ProjectCard from "./project-card"

const projects = [
  {
    id: 1,
    icon: "📷",
    title: "Face Authentication System",
    description: "A secure system for verification using advanced neural networks and biometric technology.",
    tags: ["AI", "Security", "Biometric"],
    buttons: [
      { label: "View Code", variant: "primary", href: "#" },
      { label: "Run Interactive Demo", variant: "secondary", href: "#" },
    ],
  },
  {
    id: 2,
    icon: "💬",
    title: "Medical RAG Chat Bot",
    description: "An intelligent conversational agent powered by retrieval-augmented generation for accurate responses.",
    tags: ["AI", "Healthcare", "RAG"],
    buttons: [
      { label: "View Code", variant: "primary", href: "https://github.com/tran-kim-quang/visual-rag" },
      { label: "Run Interactive Demo", variant: "secondary", href: "/chat" },
      { label: "Video Demo", variant: "primary", href: "#" },
    ],
  },
  {
    id: 3,
    icon: "🔍",
    title: "Fraud Detection API",
    description: "An advanced system for detecting fraudulent transactions using machine learning algorithms.",
    tags: ["ML", "Security", "API"],
    buttons: [
      { label: "View Code", variant: "primary", href: "#" },
      { label: "Run Interactive Demo", variant: "secondary", href: "#" },
    ],
  },
  {
    id: 4,
    icon: "🚗",
    title: "Autonomous Driving Simulator",
    description: "A realistic simulation environment for training and testing autonomous vehicle models.",
    tags: ["AI", "Simulation", "Autonomous"],
    buttons: [
      { label: "View Code", variant: "primary", href: "#" },
      { label: "Run Interactive Demo", variant: "secondary", href: "#" },
    ],
  },
]

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative py-20 px-4 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xMDQuODk2LTIgMi0yaDJ2LTJjMC0xLjEwNC44OTYtMiAyLTJzMiAuODk2IDIgMnYyaDJjMS4xMDQgMCAyIC44OTYgMiAycy0uODk2IDItMiAyaC0ydjJjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0ydi0yaC0yYy0xLjEwNCAwLTItLjg5Ni0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold tracking-wide">
              🚀 MY PROJECTS
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Featured Work
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my latest projects in AI, machine learning, and innovative technology solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </section>
  )
}