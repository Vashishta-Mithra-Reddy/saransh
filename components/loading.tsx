import { Dithering } from "@paper-design/shaders-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
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
    </div>
  );
}
