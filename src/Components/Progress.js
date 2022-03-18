import React from "react";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth={"0.7rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="40%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1em"}
      fontWeight={"bold"}
      fill="#fff"
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProgressBar = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200} style={{ width: "100%", height: "100%" }}>
      <g transform={`rotate(-90 ${"82 100"})`}>
        <Circle colour="lightgrey" />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default ProgressBar;
