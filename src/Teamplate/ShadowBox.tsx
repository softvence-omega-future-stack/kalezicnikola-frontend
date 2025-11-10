import React from "react";

interface ShadowBoxProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  color?: string;
  blur?: string;
  className?: string;
}

const ShadowBox: React.FC<ShadowBoxProps> = ({
  width = "256px",
  height = "295px",
  borderRadius = "295px",
  color = "#72FF5C",
  blur = "100px",
  className = "",
}) => {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: color,
        filter: `blur(${blur})`,
      }}
    />
  );
};

export default ShadowBox;
