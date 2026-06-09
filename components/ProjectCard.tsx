import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  if (project.wip) {
    return (
      <div className="flex flex-col border opacity-60 cursor-default" data-ref={project.ref}
        style={{ borderColor: "rgba(0,220,180,0.1)", borderStyle: "dashed" }}>
        <div className="relative aspect-[4/3] flex items-center justify-center"
          style={{ background: "var(--bg2, #0f1419)" }}>
          <div className="text-center">
            <div className="text-2xl opacity-30 mb-1">⚙</div>
            <div className="font-mono-custom text-xs tracking-widest text-[#2a3e36]">In Progress</div>
          </div>
          <span className="absolute top-2 right-2 font-mono-custom text-[10px] text-[#2a3e36]">{project.ref}</span>
        </div>
        <div className="p-4 flex flex-col gap-1.5 border-t" style={{ borderColor: "rgba(0,220,180,0.08)" }}>
          <div className="flex gap-1 flex-wrap">
            {project.categories.map(c => (
              <span key={c} className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded-sm bg-accent-subtle text-accent border border-[var(--accent)] border-opacity-30">{c}</span>
            ))}
          </div>
          <h3 className="font-mono-custom text-sm font-medium">{project.title}</h3>
          <p className="text-xs leading-relaxed text-[#5a7a6e]">{project.description[0]}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`}
      className="group flex flex-col border transition-colors cursor-pointer"
      data-ref={project.ref}
      style={{ borderColor: "rgba(0,220,180,0.1)", background: "var(--bg, #060809)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2, #0f1419)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--bg, #060809)")}>

      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
        style={{ background: "var(--bg2, #0f1419)" }}>
        {project.media[0] && (
          <Image
            src={project.media[0].type === 'video' ? (project.media.find(m=>m.type==='image')?.src || project.media[0].src) : project.media[0].src}
            alt={project.title}
            fill
            className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(0,15,10,0.7)" }}>
          <span className="font-mono-custom text-xs tracking-widest text-accent border border-[var(--accent)] px-4 py-2 rounded-sm"
            style={{ boxShadow: "0 0 14px rgba(0,220,180,0.2)" }}>
            View Project ↗
          </span>
        </div>
        {/* badges */}
        <div className="absolute bottom-2 left-2 flex gap-1 z-10">
          {project.hasVideo && (
            <span className="font-mono-custom text-[10px] font-medium px-2 py-0.5 rounded-sm text-accent border border-[var(--accent)]"
              style={{ background: "rgba(0,220,180,0.15)" }}>▶ Video</span>
          )}
          {project.hasGithub && (
            <span className="font-mono-custom text-[10px] font-medium px-2 py-0.5 rounded-sm text-accent border border-[var(--accent)]"
              style={{ background: "rgba(0,220,180,0.12)" }}>&lt;/&gt; GitHub</span>
          )}
        </div>
        <span className="absolute top-2 right-2 font-mono-custom text-[10px] text-[#2a3e36] z-10">{project.ref}</span>
      </div>

      <div className="p-4 flex flex-col gap-1.5 border-t" style={{ borderColor: "rgba(0,220,180,0.08)" }}>
        <div className="flex gap-1 flex-wrap">
          {project.categories.map(c => (
            <span key={c} className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded-sm"
              style={{ background: "rgba(0,220,180,0.05)", color: "#5a7a6e", border: "1px solid rgba(0,220,180,0.1)" }}>{c}</span>
          ))}
        </div>
        <h3 className="font-mono-custom text-sm font-medium text-[#c8ddd5]">{project.title}</h3>
        <p className="text-xs leading-relaxed text-[#5a7a6e]">{project.description[0].slice(0,100)}...</p>
      </div>
    </Link>
  );
}
