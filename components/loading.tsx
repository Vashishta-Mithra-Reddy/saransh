"use client";

import { Dithering, LiquidMetal, Metaballs } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  // const text = "Loading...".split("");

  const [effectIndex, setEffectIndex] = useState<number | null>(null);

  useEffect(() => {
    setEffectIndex(Math.floor(Math.random() * 3)); // 0, 1, or 2
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Visual effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {effectIndex === null ? null : effectIndex === 0 ? (
            <LiquidMetal
              style={{ height: 500, width: 500 }}
              colorBack="#ffffff00"
              colorTint="#ffffff"
              repetition={4}
              softness={0.3}
              shiftRed={0.3}
              shiftBlue={0.3}
              distortion={0.1}
              contour={1}
              shape="circle"
              offsetX={0}
              offsetY={0}
              scale={0.6}
              rotation={0}
              speed={1}
            />
          ) : effectIndex === 1 ? (
            <Dithering
              style={{ height: 500, width: 500 }}
              colorBack="#ffffff00"
              colorFront="#00b3ff"
              shape="sphere"
              type="4x4"
              pxSize={2}
              offsetX={0}
              offsetY={0}
              scale={0.6}
              rotation={0}
              speed={1}
            />
          ) : (
            <Metaballs
              style={{ height: 500, width: 500 }}
              colors={["#145cfc","#0341c9","#155dfc"]}
              colorBack="#ffffff00"
              count={10}
              size={0.83}
              offsetX={0}
              offsetY={0}
              scale={0.9}
              rotation={0}
              speed={1}
            />
          )}
        </motion.div>

        {/* Animated text */}
        {/* <motion.div
          initial={{ opacity: 0.5, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {text.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="text-2xl inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div> */}
        
      </div>
    </div>
  );
}
