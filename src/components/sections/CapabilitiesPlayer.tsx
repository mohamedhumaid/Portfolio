"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { InfiniteBentoPan } from "@/components/ui/infinite-bento-pan";

export default function CapabilitiesPlayer() {
  const props = useMemo(
    () => ({ speed: 0.8, accentColor: "#0047AB" }),
    []
  );

  return (
    <Player
      component={InfiniteBentoPan as React.ComponentType<typeof props>}
      inputProps={props}
      durationInFrames={360}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "16 / 9",
        borderRadius: 20,
        overflow: "hidden",
        background: "#050505",
        boxShadow: "0 30px 100px rgba(0,71,171,0.2), 0 0 0 1px rgba(0,71,171,0.1)",
      }}
    />
  );
}
