"use client";

import Tilt from "react-parallax-tilt";
import { useState } from "react";
import Image from "next/image";

export default function JokerTilt() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="absolute inset-0 flex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* LEFT JOKER */}
      <div className="w-1/2 h-full flex justify-end items-center">
        <Tilt
          tiltEnable={hover}
          tiltMaxAngleX={8}
          tiltMaxAngleY={-8}
          scale={1.03}
          transitionSpeed={1200}
        >
          <Image
            src="/left.png"
            alt="joker left"
            width={600}
            height={800}
            className="object-contain pointer-events-none"
            priority
          />
        </Tilt>
      </div>

      {/* RIGHT JOKER */}
      <div className="w-1/2 h-full flex justify-start items-center">
        <Tilt
          tiltEnable={hover}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.03}
          transitionSpeed={1200}
        >
          <Image
            src="/right.png"
            alt="joker right"
            width={600}
            height={800}
            className="object-contain pointer-events-none"
            priority
          />
        </Tilt>
      </div>
    </div>
  );
}
