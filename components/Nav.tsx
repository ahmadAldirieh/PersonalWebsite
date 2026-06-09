"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero","about","experience","projects","contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const links = [
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "var(--bg, #060809)", borderColor: "rgba(0,220,180,0.22)" }}>
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono-custom text-sm font-medium tracking-widest flex items-center gap-2 text-accent">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] status-glow" />
          AA
        </Link>

        <nav className="hidden md:flex gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`font-mono-custom text-xs tracking-wide transition-colors
                ${active === l.href.replace("/#","") ? "text-accent" : "text-[#5a7a6e] hover:text-accent"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}
            className="w-9 h-9 rounded border flex items-center justify-center transition-colors text-[#5a7a6e] hover:text-accent"
            style={{ borderColor: "rgba(0,220,180,0.22)" }}>
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu">
            <span className="block w-5 h-px bg-[#5a7a6e]" />
            <span className="block w-5 h-px bg-[#5a7a6e]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col border-t" style={{ borderColor: "rgba(0,220,180,0.1)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3.5 font-mono-custom text-sm text-[#5a7a6e] border-b hover:text-accent transition-colors"
              style={{ borderColor: "rgba(0,220,180,0.08)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
