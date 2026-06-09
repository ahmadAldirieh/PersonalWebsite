"use client";
import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/projects";

export default function ProjectGallery({ media }: { media: MediaItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = media[activeIdx];
  if (!media.length) return null;

  return (
    <div className="mb-10">
      <div className="border rounded-sm overflow-hidden mb-2 aspect-video flex items-center justify-center"
        style={{ borderColor: "rgba(0,220,180,0.22)", background: "#000" }}>
        {active.type === "video" ? (
          <video key={active.src} className="w-full h-full object-contain" controls playsInline autoPlay>
            <source src={active.src} type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full">
            <Image src={active.src} alt={active.label} fill className="object-contain" />
          </div>
        )}
      </div>
      {media.length > 1 && (
        <div className="flex gap-1.5 flex-wrap">
          {media.map((m, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="w-24 aspect-[4/3] rounded-sm overflow-hidden border transition-all flex-shrink-0 flex items-center justify-center"
              style={{
                borderColor: i === activeIdx ? "var(--accent)" : "rgba(0,220,180,0.1)",
                opacity: i === activeIdx ? 1 : 0.5,
                background: "#0f1419",
                boxShadow: i === activeIdx ? "0 0 8px rgba(0,220,180,0.2)" : "none",
              }}>
              {m.type === "video" ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-accent text-base">▶</span>
                  <span className="font-mono-custom text-[9px] text-[#5a7a6e] text-center px-1">{m.label}</span>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image src={m.src} alt={m.label} fill className="object-cover" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
