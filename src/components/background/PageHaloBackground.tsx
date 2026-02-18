import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-expect-error: HALO does not have TypeScript definitions
import HALO from "vanta/dist/vanta.halo.min.js";

export default function PageHaloBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [effect, setEffect] = useState<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!effect && ref.current) {
      setEffect(
        HALO({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,

          minHeight: 200,
          minWidth: 200,

          // subtle, page-safe
          amplitudeFactor: 1.0,
          size: 1.0,

          backgroundColor: 0x0d1117, // match your page bg
        })
      );
    }

    return () => {
      if (effect) effect.destroy();
    };
  }, [effect]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
