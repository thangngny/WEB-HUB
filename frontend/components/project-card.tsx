import Link from "next/link"

interface Button {
  label: string
  variant: "primary" | "secondary"
  href: string
}

interface Project {
  id: number
  icon: string
  title: string
  description: string
  tags?: string[]
  buttons: Button[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative h-full">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      
      {/* Card Content */}
      <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
        {/* Icon & Badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-6xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            {project.icon}
          </div>
          <div className="flex gap-2">
            {project.tags?.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(2).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          {project.buttons.map((button, idx) => (
            <Link
              key={idx}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : undefined}
              rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`
                px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105
                ${
                  button.variant === "primary"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70"
                    : "bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600"
                }
              `}
            >
              {button.label}
            </Link>
          ))}
        </div>

        {/* Corner Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  )
}