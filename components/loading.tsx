"use client";

import { Dithering } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export default function Loading() {
  const text = "Loading...".split("");

  return (
    <div
      className="flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
      initial={{ opacity: 0.5, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}>
        {text.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.5, y: 0 }}  // Initial Y position at 0
          animate={{
            opacity: [0.4, 1, 0.4],  // Opacity animation as before
            // y: [0, -2, 0],  // Move up and down on the Y axis
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="text-2xl inline-block" // Added inline-block here
        >
          {char}
        </motion.span>
      ))}
      </motion.div>
      <motion.div
      initial={{ opacity: 0.5, scale: 0.9, filter: "blur(5px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}>
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
        </motion.div>
        </div>
    </div>
  );
}
