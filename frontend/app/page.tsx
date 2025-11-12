import Header from "@/components/header"
import Hero from "@/components/hero"
import ProjectGrid from "@/components/project-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProjectGrid />
    </main>
  )
}
