"use client";
import { useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const revealRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    revealRef.current = els;
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
          e.target.classList.add("vis");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const skills = {
    Languages: ["C++", "Python", "Verilog (HDL)", "Ladder Logic", "Great Cow BASIC", "Processing", "CSS", "JavaScript", "HTML"],
    "Hardware & EE": ["Altium Designer", "EPLAN ProPanel", "PCB Design", "Arduino", "Siemens TIA Portal", "Soldering", "TraxMaker", "3D Modelling"],
    Software: ["Pandas", "Git", "Pygame", "Machine Learning"],
  };

  const experience = [
    {
      year: "2026",
      role: "Control Systems Hardware Design Co-op",
      company: "ATS Corporation",
      url: "https://atsautomation.com",
      period: "Jan to May 2026",
      desc: "Designed and refined electrical schematics in EPLAN, implementing changes to ensure system functionality. Built detailed Bills of Materials through vendor cross-referencing and component research. Collaborated with software engineers and electricians to troubleshoot systems under tight deadlines.",
      tags: ["EPLAN", "Schematics", "BOM", "Hardware Design"],
    },
    {
      year: "2025",
      role: "Electrical Subsystem Member",
      company: "UW Formula Electric",
      url: "https://www.uwfsae.ca/",
      period: "Sept 2025 to Present",
      desc: "Designing PCBs in Altium Designer for sensor interface and power subsystems of a formula-style electric race car. Hands-on vehicle implementation in a competitive team environment.",
      tags: ["Altium", "PCB Design", "Schematics"],
    },
    {
      year: "2024",
      role: "Student Researcher",
      company: "UWaterloo — Dr. Eugene Li's Lab",
      url: null,
      period: "Nov 2024 to Feb 2025",
      desc: "Contributed to a predictive maintenance project for CNC mill blades. Prepared datasets and supported training of an ML model for Remaining Useful Life estimation. Documented outputs to validate reliability.",
      tags: ["Python", "Pandas", "ML", "RUL"],
    },
    {
      year: "2024",
      role: "Electrical Engineering Design Co-op",
      company: "Rittal Canada",
      url: "https://www.rittal.com/ca-en/",
      period: "Jun to Jul 2024",
      desc: "Designed motor control centers in EPLAN, created 3D macros, and designed copper busbar systems. Coordinated modifications at the assembly center and provided technical input in client meetings.",
      tags: ["EPLAN", "MCC Design", "3D Macros", "Busbar"],
    },
  ];

  return (
    <>
      <Nav />
      <main className="w-full">

        {/* ── HERO ── */}
        <section id="hero" className="min-h-screen flex flex-col justify-center w-full relative z-10">
        <div className="max-w-6xl mx-auto w-full px-8 pt-32 pb-20">
          <div className="flex items-center gap-2.5 font-mono-custom text-xs text-[#5a7a6e] mb-8 tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] status-glow" />
            Open to co-ops &amp; internships
          </div>
          <h1 className="mb-7 leading-[0.9] tracking-tight" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            <span className="block text-[clamp(3rem,8.5vw,7.5rem)] font-black text-[#c8ddd5]">Ahmad</span>
            <span className="block text-[clamp(3rem,8.5vw,7.5rem)] font-black text-accent">Aldirieh</span>
          </h1>
          <p className="font-mono-custom text-xs text-[#5a7a6e] mb-7 tracking-wide">
            EE @ Waterloo &nbsp;&bull;&nbsp; Hardware &nbsp;&bull;&nbsp; Software &nbsp;&bull;&nbsp; Robotics
          </p>
          <p className="max-w-[500px] text-[#5a7a6e] text-base leading-relaxed mb-8">
            I build things end to end. Autonomous robots, custom PCBs, ML research, and the code to tie it all together. Currently studying Electrical Engineering at UWaterloo.
          </p>
          <div className="flex gap-2.5 flex-wrap mb-7">
            <Link href="/#projects"
              className="font-mono-custom text-xs font-medium tracking-widest px-6 py-3 border border-[var(--accent)] text-accent rounded-sm transition-all hover:bg-[var(--accent)] hover:text-black"
              style={{}}>
              See my work ↓
            </Link>
            <a href="mailto:a2aldiri@uwaterloo.ca"
              className="font-mono-custom text-xs tracking-wide px-6 py-3 border text-[#5a7a6e] rounded-sm transition-colors hover:border-[var(--accent)] hover:text-accent"
              style={{ borderColor: "rgba(0,220,180,0.22)" }}>
              a2aldiri@uwaterloo.ca
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener"
              className="font-mono-custom text-xs tracking-wide px-6 py-3 border text-[#5a7a6e] rounded-sm transition-colors hover:border-[var(--accent)] hover:text-accent"
              style={{ borderColor: "rgba(0,220,180,0.22)" }}>
              Resume ↗
            </a>
          </div>
          <div className="flex gap-6">
            {[["LinkedIn ↗","http://linkedin.com/in/ahmad-dirieh"],["GitHub ↗","https://github.com/ahmadAldirieh"]].map(([label,href])=>(
              <a key={href} href={href} target="_blank" rel="noopener"
                className="font-mono-custom text-xs text-[#2a3e36] hover:text-accent transition-colors">{label}</a>
            ))}
          </div>
        </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24 relative z-10 w-full">
          <div className="max-w-6xl mx-auto w-full px-8">
            <div className="font-mono-custom text-xs tracking-[0.14em] text-accent mb-3 uppercase">01 — About</div>
            <h2 className="mb-12 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-none"
              style={{ fontFamily: "'Unbounded', sans-serif" }}>Who I am.</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <p className="text-[#5a7a6e] mb-5 leading-relaxed">
                  I&apos;m an Electrical Engineering student at the <strong className="text-[#c8ddd5] font-medium">University of Waterloo</strong> (BASc, expected 2030). I work on both sides of the stack: hardware and software. From designing schematics in EPLAN and laying out PCBs in Altium, to writing code and contributing to ML research.
                </p>
                <p className="text-[#5a7a6e] leading-relaxed">
                  When I&apos;m not buried in engineering work, I&apos;m usually at the gym. I&apos;ve been lifting for about a year and am currently at around an 850-lb total (bench, squat, deadlift) with a 275-lb bench press. I also play chess from time to time, hovering around an 800 rating and making questionable decisions on the board. I&apos;m a big soccer fan too, especially when FC Barcelona is playing.
                </p>
              </div>
              <div className="border relative rounded-sm p-7" style={{ borderColor: "rgba(0,220,180,0.22)", background: "var(--bg2,#0f1419)" }}>
                <div className="font-mono-custom text-xs font-medium text-accent mb-6 tracking-widest uppercase">// Skills</div>
                {Object.entries(skills).map(([label, items]) => (
                  <div key={label} className="mb-5 last:mb-0">
                    <div className="font-mono-custom text-[10px] tracking-[0.12em] uppercase text-[#2a3e36] mb-2">{label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map(s => (
                        <span key={s} className="font-mono-custom text-[11px] px-2 py-0.5 rounded-sm border transition-all cursor-default hover:text-accent"
                          style={{ background: "rgba(0,220,180,0.04)", color: "#5a7a6e", borderColor: "rgba(0,220,180,0.1)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-24 relative z-10 w-full" style={{ background: "var(--bg1,#0a0e12)" }}>
          <div className="max-w-6xl mx-auto w-full px-8">
            <div className="font-mono-custom text-xs tracking-[0.14em] text-accent mb-3 uppercase">02 — Experience</div>
            <h2 className="mb-12 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-none"
              style={{ fontFamily: "'Unbounded', sans-serif" }}>Where I&apos;ve worked.</h2>
            <div className="relative">
              {/* vertical trace */}
              <div className="absolute left-11 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,220,180,0.25) 10%, rgba(0,220,180,0.25) 90%, transparent)" }} />
              <div className="flex flex-col">
                {experience.map((exp, i) => (
                  <div key={i} className="reveal grid gap-8 py-10 border-b" style={{ gridTemplateColumns: "90px 1fr", borderColor: "rgba(0,220,180,0.08)" }}>
                    <div className="flex flex-col items-center pt-1 relative z-10">
                      <div className="font-mono-custom text-xs font-medium text-accent tracking-wide mb-1.5">{exp.year}</div>
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-[var(--accent)]" style={{ background: "var(--bg1,#0a0e12)", boxShadow: "0 0 8px var(--accent)" }} />
                    </div>
                    <div>
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                        <div>
                          <div className="font-bold text-lg tracking-tight text-[#c8ddd5] mb-0.5" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(0.9rem,2vw,1.1rem)" }}>{exp.role}</div>
                          {exp.url ? (
                            <a href={exp.url} target="_blank" rel="noopener" className="font-mono-custom text-xs text-[#5a7a6e] hover:text-accent transition-colors">{exp.company} ↗</a>
                          ) : (
                            <span className="font-mono-custom text-xs text-[#5a7a6e]">{exp.company}</span>
                          )}
                        </div>
                        <span className="font-mono-custom text-[10px] px-2.5 py-1 rounded-sm text-[#2a3e36] border whitespace-nowrap self-start"
                          style={{ background: "rgba(0,220,180,0.04)", borderColor: "rgba(0,220,180,0.1)" }}>{exp.period}</span>
                      </div>
                      <p className="text-sm text-[#5a7a6e] leading-relaxed mb-4">{exp.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(t => (
                          <span key={t} className="font-mono-custom text-[10px] px-2 py-0.5 rounded-sm text-accent border"
                            style={{ background: "rgba(0,220,180,0.06)", borderColor: "rgba(0,220,180,0.2)" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-24 relative z-10 w-full">
          <div className="max-w-6xl mx-auto w-full px-8">
            <div className="font-mono-custom text-xs tracking-[0.14em] text-accent mb-3 uppercase">03 — Projects</div>
            <h2 className="mb-12 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-none"
              style={{ fontFamily: "'Unbounded', sans-serif" }}>Things I&apos;ve built.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(0,220,180,0.1)" }}>
              {projects.map(p => (
                <div key={p.slug} className="reveal">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24 relative z-10 w-full" style={{ background: "var(--bg1,#0a0e12)" }}>
          <div className="max-w-6xl mx-auto w-full px-8 flex flex-col gap-6">
            <div className="font-mono-custom text-xs tracking-[0.14em] text-accent uppercase">04 — Contact</div>
            <h2 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-black tracking-tight leading-none"
              style={{ fontFamily: "'Unbounded', sans-serif" }}>
              Let&apos;s build<br />something.
            </h2>
            <p className="max-w-lg text-[#5a7a6e] leading-relaxed">
              I&apos;m looking for software-focused co-op and internship opportunities. Have a project, role, or interesting engineering problem? Reach out.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <a href="mailto:a2aldiri@uwaterloo.ca"
                className="font-mono-custom text-xs font-medium tracking-widest px-6 py-3 border border-[var(--accent)] text-accent rounded-sm transition-all hover:bg-[var(--accent)] hover:text-black">
                Send an email ↗
              </a>
              <a href="http://linkedin.com/in/ahmad-dirieh" target="_blank" rel="noopener"
                className="font-mono-custom text-xs tracking-wide px-6 py-3 border text-[#5a7a6e] rounded-sm transition-colors hover:border-[var(--accent)] hover:text-accent"
                style={{ borderColor: "rgba(0,220,180,0.22)" }}>LinkedIn ↗</a>
              <a href="https://github.com/ahmadAldirieh" target="_blank" rel="noopener"
                className="font-mono-custom text-xs tracking-wide px-6 py-3 border text-[#5a7a6e] rounded-sm transition-colors hover:border-[var(--accent)] hover:text-accent"
                style={{ borderColor: "rgba(0,220,180,0.22)" }}>GitHub ↗</a>
            </div>
          </div>
        </section>

      </main>
      <footer className="max-w-6xl mx-auto w-full px-8 py-6 border-t flex justify-between font-mono-custom text-[10px] text-[#2a3e36]"
        style={{ borderColor: "rgba(0,220,180,0.1)" }}>
        <span>© {new Date().getFullYear()} Ahmad Aldirieh</span>
        <span>Waterloo, ON</span>
      </footer>
    </>
  );
}
