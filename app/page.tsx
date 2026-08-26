import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Showreel from "@/components/home/Showreel";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Packages from "@/components/packages/Packages";
import { getFeaturedProject, getPackages, getProjects } from "@/lib/data";

// This page is a Server Component: it fetches everything it needs from
// Supabase up front, then hands the data down to client components that
// handle interactivity (filtering, modals, forms). If you want to change
// WHAT data is fetched, edit lib/data.ts — not this file.
export default async function HomePage() {
  const [projects, packages, showreelProject] = await Promise.all([
    getProjects(),
    getPackages(),
    getFeaturedProject(),
  ]);

  return (
    <main className="bg-obsidian">
      <Navbar />
      <Hero />
      <Showreel
        videoUrl={showreelProject?.video_url ?? null}
        posterUrl={showreelProject?.thumbnail_url ?? null}
      />
      <ProjectsSection projects={projects} />
      <Packages packages={packages} />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
