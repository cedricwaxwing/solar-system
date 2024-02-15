import { useEffect, useRef } from "react";

export const UIPowerDial = ({ speed }) => {
  const clipPathRef = useRef(null);

  useEffect(() => {
    let t = speed;
    const r = 100;
    const cx = 100;
    const cy = 100;

    if (t >= 1) {
      t = 0.9999;
    }

    const x0 = cx;
    const y0 = cy - r;

    const angleRadians = 2 * Math.PI * t - Math.PI / 2;
    const x1 = cx + r * Math.cos(angleRadians);
    const y1 = cy + r * Math.sin(angleRadians);

    const largeArcFlag = t > 0.5 ? 1 : 0;
    const sweepFlag = 1;

    const d = `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${largeArcFlag},${sweepFlag} ${x1},${y1} Z`;

    if (clipPathRef.current && x1 && y1) {
      clipPathRef.current.setAttribute("d", d);
    }
  }, [speed]); // Only re-run the effect if speed changes

  return (
    <>
      <path
        d='M195 106.669C195 155.27 155.601 194.669 107 194.669C58.399 194.669 19.0001 155.27 19.0001 106.669C19.0001 58.0679 58.399 18.669 107 18.669C155.601 18.669 195 58.0679 195 106.669Z'
        className='stroke-primary'
        strokeOpacity='0.2'
        strokeWidth='3'
        strokeDasharray='8 1'
      />
      <g
        clipPath={speed && "url(#powerClip)"}
        style={{ opacity: speed === 0 ? 0 : 1 }}>
        <path
          d='M195 106.669C195 155.27 155.601 194.669 107 194.669C58.399 194.669 19.0001 155.27 19.0001 106.669C19.0001 58.0679 58.399 18.669 107 18.669C155.601 18.669 195 58.0679 195 106.669Z'
          className='stroke-primary'
          strokeOpacity='1'
          strokeWidth='3'
          strokeDasharray='8 1'
          name='power'
        />
      </g>
      <defs>
        <clipPath id='powerClip'>
          <path ref={clipPathRef} />
        </clipPath>
      </defs>
    </>
  );
};
