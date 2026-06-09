import { getProject, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ProjectGallery from "@/components/ProjectGallery";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <Link href="/#projects" className="inline-flex items-center gap-1.5 font-mono-custom text-xs text-[#5a7a6e] hover:text-accent transition-colors mb-10">
            ← Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex gap-1.5 flex-wrap mb-3">
              {project.categories.map(c => (
                <span key={c} className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded-sm border text-[#5a7a6e]"
                  style={{ background: "rgba(0,220,180,0.04)", borderColor: "rgba(0,220,180,0.1)" }}>{c}</span>
              ))}
            </div>
            <h1 className="font-black tracking-tight leading-none mb-2 text-[#c8ddd5]"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem,5vw,4rem)" }}>
              {project.title}
            </h1>
            <p className="font-mono-custom text-sm text-[#5a7a6e] mb-3">{project.subtitle}</p>
            {project.hasGithub && project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener"
                className="inline-block font-mono-custom text-xs text-accent border border-[var(--accent)] px-3 py-1.5 rounded-sm hover:bg-[var(--accent-bg)] transition-colors">
                View on GitHub ↗
              </a>
            )}
          </div>

          {/* Gallery — client component for interactivity */}
          <ProjectGallery media={project.media} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16 items-start">
            <div>
              <div className="font-mono-custom text-[10px] tracking-[0.16em] text-accent uppercase mb-3">About the Project</div>
              {project.description.map((p, i) => (
                <p key={i} className="text-[#5a7a6e] text-sm leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </div>
            {project.stack.length > 0 && (
              <div>
                <div className="font-mono-custom text-[10px] tracking-[0.16em] text-accent uppercase mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(s => (
                    <span key={s} className="font-mono-custom text-[11px] px-2 py-0.5 rounded-sm border"
                      style={{ background: "rgba(0,220,180,0.04)", color: "#5a7a6e", borderColor: "rgba(0,220,180,0.1)" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
