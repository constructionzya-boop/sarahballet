import type { ProjectId } from "../lib/pricing";

const CELL = 44; // px par travée de 1,20 m
const PAD = 34;

type Geometry = { widthBays: number; depthBays: number };

function geometry(project: ProjectId, extraTravees: number): Geometry {
  if (project === "local-pro") return { widthBays: 2, depthBays: 2 };
  return { widthBays: 3, depthBays: 4 + extraTravees };
}

export type PlanPreview2DProps = {
  project: ProjectId;
  extraTravees: number;
  className?: string;
};

/**
 * Plan 2D schématique qui s'allonge avec les travées. Trame 1,20 m visible,
 * porte (P4) en façade, fenêtres (P3) sur les longs pans, casquettes (P5).
 */
export function PlanPreview2D({ project, extraTravees, className }: PlanPreview2DProps) {
  const { widthBays, depthBays } = geometry(project, extraTravees);
  const w = widthBays * CELL;
  const h = depthBays * CELL;
  const svgW = w + PAD * 2;
  const svgH = h + PAD * 2;

  const gridLines = [];
  for (let i = 1; i < widthBays; i++) {
    gridLines.push(
      <line key={`v${i}`} x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={PAD + h} />,
    );
  }
  for (let j = 1; j < depthBays; j++) {
    gridLines.push(
      <line key={`h${j}`} x1={PAD} y1={PAD + j * CELL} x2={PAD + w} y2={PAD + j * CELL} />,
    );
  }

  // Porte en façade (bas), travée centrale.
  const doorBay = Math.floor(widthBays / 2);
  const doorX = PAD + doorBay * CELL;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className={className}
      role="img"
      aria-label={`Plan schématique : ${widthBays} × ${depthBays} travées de 1,20 m`}
    >
      {/* Remplissage sol */}
      <rect x={PAD} y={PAD} width={w} height={h} rx="4" className="fill-dew/20" />

      {/* Trame 1,20 m */}
      <g className="stroke-dawn/30" strokeWidth="1" strokeDasharray="3 3">
        {gridLines}
      </g>

      {/* Murs */}
      <rect
        x={PAD}
        y={PAD}
        width={w}
        height={h}
        rx="4"
        className="fill-none stroke-night"
        strokeWidth="4"
      />

      {/* Fenêtres P3 sur les longs pans */}
      <g className="stroke-dawn" strokeWidth="4">
        <line x1={PAD} y1={PAD + CELL} x2={PAD} y2={PAD + CELL * 2} />
        <line x1={PAD + w} y1={PAD + CELL} x2={PAD + w} y2={PAD + CELL * 2} />
      </g>

      {/* Porte P4 en façade (accent) */}
      <line
        x1={doorX + 6}
        y1={PAD + h}
        x2={doorX + CELL - 6}
        y2={PAD + h}
        className="stroke-orange"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Cote de trame */}
      <g className="fill-dawn text-[10px]">
        <text x={PAD + CELL / 2} y={PAD - 12} textAnchor="middle">
          1,20 m
        </text>
      </g>
      <g className="stroke-dawn/60" strokeWidth="1">
        <line x1={PAD} y1={PAD - 8} x2={PAD + CELL} y2={PAD - 8} />
      </g>
    </svg>
  );
}
