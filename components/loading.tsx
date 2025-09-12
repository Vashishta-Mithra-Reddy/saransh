"use client";

import { Dithering, LiquidMetal } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const text = "Loading...".split("");

  const [showLiquidMetal, setShowLiquidMetal] = useState<boolean | null>(null);

  useEffect(() => {
    setShowLiquidMetal(Math.random() < 0.5);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Visual effect */}
        <motion.div
          initial={{ opacity: 0.5, scale: 0.9, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {showLiquidMetal === null ? null : showLiquidMetal ? (
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
          ) : (
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
          )}
        </motion.div>

        {/* Animated text */}
        <motion.div
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
        </motion.div>
        
      </div>
    </div>
  );
}
