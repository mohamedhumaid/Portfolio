"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const RADIUS = 190;

function getPos(index: number, total: number, angle: number) {
  const deg = ((index / total) * 360 + angle) % 360;
  const rad = (deg * Math.PI) / 180;
  const x = Math.round(RADIUS * Math.cos(rad));
  const y = Math.round(RADIUS * Math.sin(rad));
  const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
  const zIndex = Math.round(100 + 50 * Math.cos(rad));
  return { x, y, opacity, zIndex };
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  // ── Expanded state ─────────────────────────────────────────────────────────
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [pulseIds, setPulseIds] = useState<Set<number>>(new Set());

  // ── Animation refs — never trigger React re-renders ────────────────────────
  const angleRef     = useRef(0);
  const rotatingRef  = useRef(true);
  const rafRef       = useRef<number>(0);
  const expandedRef  = useRef<number | null>(null);    // mirrors expandedId for RAF
  const nodeRefs     = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef     = useRef<HTMLDivElement>(null);

  // ── RAF loop: update DOM directly, zero React re-renders ──────────────────
  useEffect(() => {
    const total = timelineData.length;

    const tick = () => {
      if (rotatingRef.current) {
        angleRef.current = (angleRef.current + 0.28) % 360;
      }

      timelineData.forEach((item, i) => {
        const el = nodeRefs.current[item.id];
        if (!el) return;
        const pos = getPos(i, total, angleRef.current);
        const isExpanded = expandedRef.current === item.id;

        el.style.transform  = `translate(${pos.x}px, ${pos.y}px) translateZ(0)`;
        el.style.opacity    = isExpanded ? "1" : String(pos.opacity.toFixed(3));
        el.style.zIndex     = isExpanded ? "200" : String(pos.zIndex);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [timelineData]);

  // ── Interaction ────────────────────────────────────────────────────────────
  const getRelated = useCallback(
    (id: number) => timelineData.find((t) => t.id === id)?.relatedIds ?? [],
    [timelineData]
  );

  const snapToNode = useCallback(
    (id: number) => {
      const idx = timelineData.findIndex((t) => t.id === id);
      angleRef.current = (270 - (idx / timelineData.length) * 360 + 360) % 360;
    },
    [timelineData]
  );

  const handleToggle = (id: number) => {
    const opening = expandedId !== id;
    const next = opening ? id : null;
    expandedRef.current = next;
    setExpandedId(next);
    rotatingRef.current = !opening;

    if (opening) {
      setPulseIds(new Set(getRelated(id)));
      snapToNode(id);
    } else {
      setPulseIds(new Set());
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      expandedRef.current = null;
      setExpandedId(null);
      rotatingRef.current = true;
      setPulseIds(new Set());
    }
  };

  const getStatusLabel = (s: TimelineItem["status"]) =>
    s === "completed" ? "EXPERT" : s === "in-progress" ? "GROWING" : "LEARNING";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div
        ref={orbitRef}
        className="relative flex items-center justify-center"
        style={{ width: 500, height: 500 }}
      >
        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-white/[0.08] pointer-events-none"
          style={{ width: RADIUS * 2, height: RADIUS * 2 }}
        />

        {/* Center orb */}
        <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#0047AB] via-[#4d8fe0] to-cyan-400 animate-pulse flex items-center justify-center z-10 pointer-events-none">
          <div className="absolute rounded-full border border-white/20 animate-ping opacity-50" style={{ width: 72, height: 72 }} />
          <div className="absolute rounded-full border border-white/10 animate-ping opacity-30" style={{ width: 88, height: 88, animationDelay: "0.6s" }} />
          <div className="w-7 h-7 rounded-full bg-white/85 backdrop-blur-md" />
        </div>

        {/* Nodes — positioned via inline styles by RAF */}
        {timelineData.map((item) => {
          const isExpanded = expandedId === item.id;
          const isPulsing  = pulseIds.has(item.id);
          const Icon       = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="absolute cursor-pointer select-none"
              style={{
                willChange: "transform",
                /* initial position at center — RAF will move them immediately */
                transform: "translate(0px, 0px) translateZ(0)",
              }}
              onClick={(e) => { e.stopPropagation(); handleToggle(item.id); }}
            >
              {/* Pulse aura */}
              {isPulsing && (
                <div
                  className="absolute rounded-full animate-ping pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(0,71,171,0.35) 0%, transparent 70%)",
                    width: 60, height: 60,
                    left: -10, top: -10,
                  }}
                />
              )}

              {/* Icon circle */}
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "border-2 transition-colors duration-200",
                  isExpanded
                    ? "bg-[#0047AB] text-white border-[#4d8fe0] scale-150 shadow-lg shadow-[#0047AB]/40"
                    : isPulsing
                    ? "bg-[#0047AB]/40 text-white border-[#4d8fe0] animate-pulse"
                    : "bg-[#0a0a0f] text-white border-white/30 hover:border-[#4d8fe0]/60",
                ].join(" ")}
              >
                <Icon size={14} />
              </div>

              {/* Label — GPU-composited to prevent blur */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 44,
                  left: "50%",
                  transform: "translateX(-50%) translateZ(0)",
                  whiteSpace: "nowrap",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: isExpanded ? "#ffffff" : "rgba(255,255,255,0.65)",
                  textAlign: "center",
                  willChange: "transform",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card
                  className="absolute bg-[#0a0a0f]/95 backdrop-blur-xl border-[#0047AB]/30 shadow-2xl shadow-[#0047AB]/15 overflow-visible"
                  style={{
                    top: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 240,
                    zIndex: 300,
                  }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#4d8fe0]/50" />
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-center gap-2">
                      <Badge className="px-2 text-[10px] text-white bg-[#0047AB] border-[#0047AB]/50">
                        {getStatusLabel(item.status)}
                      </Badge>
                      <span className="text-[10px] font-mono text-white/40 shrink-0">{item.date}</span>
                    </div>
                    <CardTitle className="text-sm mt-2 text-white leading-snug">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 text-xs text-white/75">
                    <p className="leading-relaxed">{item.content}</p>

                    <div className="mt-3 pt-3 border-t border-white/[0.08]">
                      <div className="flex justify-between items-center text-[10px] mb-1.5">
                        <span className="flex items-center gap-1 text-white/50"><Zap size={9} />Proficiency</span>
                        <span className="font-mono text-[#4d8fe0]">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0047AB] to-[#06b6d4] rounded-full"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/[0.08]">
                        <div className="flex items-center gap-1 mb-2 text-white/40">
                          <Link size={9} />
                          <span className="text-[10px] uppercase tracking-wider font-medium">Related</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relId) => {
                            const rel = timelineData.find((t) => t.id === relId);
                            return (
                              <Button
                                key={relId}
                                variant="outline"
                                size="sm"
                                className="h-5 px-2 py-0 text-[10px] rounded border-[#0047AB]/25 bg-transparent hover:bg-[#0047AB]/20 text-white/70 hover:text-white"
                                onClick={(e) => { e.stopPropagation(); handleToggle(relId); }}
                              >
                                {rel?.title}
                                <ArrowRight size={7} className="ml-1 text-[#4d8fe0]" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
