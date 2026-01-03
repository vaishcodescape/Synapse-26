"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

const FluidCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",

        /* 🔥 IMPORTANT PART */
        zIndex: 9999,                 // images / SVGs ke upar
        pointerEvents: "none",        // clicks / scroll safe
        mixBlendMode: "screen",       // 🔥 overlay look
      }}
      dpr={[1, 2]}
    >
      <EffectComposer>
        <Fluid
          rainbow={false}
          fluidColor="#D2042D"   // joker pink-red
          intensity={8}
          force={2}
          distortion={1.8}
          radius={0.3}
        //   velocityDissipation={0.985}
        //   densityDissipation={0.92}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default FluidCanvas;
