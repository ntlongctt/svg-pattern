import { $setting } from "@/store/setting";
import { observer } from "@legendapp/state/react";
import { useDroppable, useDndContext } from "@dnd-kit/core";

// const blockPaths = {
// 	BlockA: "m0,0l0,100l100,0l0,-100l-100,0z",
// 	BlockB: "m0,0l0,100l100,0l0,-100l-100,0z", // Update this path as needed
// };

const blockPaths = {
  BlockC: [
    {
      d: "m0,0l0,100l100,0l0,-100l-100,0z",
      fill: "#a9a9a9",
      className: "blocka_fill1",
    },
    // Add more paths if needed
  ],
  BlockB: [
    {
      d: " M 0 0 L 0 100 L 100 0 Z",
      fill: "#bbb",
      className: "blockb_fill1",
    },
    {
      d: " M 0 100 L 100 100 L 100 0 Z",
      fill: "#666",
      className: "blockb_fill2",
    },
    // Add more paths if needed
  ],
  BlockA: [
    {
      d: "M0,0v100h100V0H0z",
      fill: "#cccccc",
      className: "block37_fill1",
    },
    {
      d: "M-0.3,25l25-25l25,25C33,25,16.3,25-0.3,25z",
      fill: "#333",
      className: "block37_fill2",
    },
    {
      d: "M-0.3,50l25-25l25,25C33,50,16.3,50-0.3,50z",
      fill: "#333",
      className: "block37_fill2",
    },
    {
      d: "M74.7,0l25,25l-25,25C74.7,33.3,74.7,16.7,74.7,0z",
      fill: "#555",
      className: "block37_fill3",
    },
    {
      d: "M49.7,0l25,25l-25,25C49.7,33.3,49.7,16.7,49.7,0z",
      fill: "#555",
      className: "block37_fill3",
    },
    {
      d: "M99.7,75l-25,25l-25-25C66.3,75,83,75,99.7,75z",
      fill: "#777",
      className: "block37_fill4",
    },
    {
      d: "M99.7,50l-25,25l-25-25C66.3,50,83,50,99.7,50z",
      fill: "#777",
      className: "block37_fill4",
    },
    {
      d: "M24.7,100l-25-25l25-25C24.7,66.7,24.7,83.3,24.7,100z",
      fill: "#999",
      className: "block37_fill5",
    },
    {
      d: "M49.7,100l-25-25l25-25C49.7,66.7,49.7,83.3,49.7,100z",
      fill: "#999",
      className: "block37_fill5",
    },
  ],
};

const SvgPattern = observer(() => {
  const $row = $setting.row.get();
  const $col = $setting.col.get();

  const renderBlocks = () => {
    const blocks = [];
    for (let row = 0; row < $row; row++) {
      for (let col = 0; col < $col; col++) {
        const isBlockA = (row + col) % 2 === 0;
        const id = `block${isBlockA ? "A" : "B"}_${row + 1}_${col + 1}`;
        blocks.push(
          <Block
            key={`block_${row}_${col}`}
            id={id}
            x={col * 100}
            y={row * 100}
            type={isBlockA ? "BlockA" : "BlockB"}
          />
        );
      }
    }
    return blocks;
  };

  return (
    <svg
      role="presentation"
      viewBox={`0 0 ${$col * 100} ${$row * 100}`}
      version="1.1"
      width={$col * 100}
      height={$row * 100}
      style={{ width: maxWidth($col * 100), height: "auto" }}
    >
      <g id="parentG">{renderBlocks()}</g>
      <g id="svgTextures">
        <defs id="defsPattern" />
      </g>
    </svg>
  );
});

const Block = ({
  id,
  x,
  y,
  type,
}: {
  id: string;
  x: number;
  y: number;
  type: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const fillColor = isOver
    ? "yellow"
    : type === "BlockA"
      ? "#a9a9a9"
      : "#898989";
  const strokeColor = isOver ? "red" : "none";

  return (
    <g ref={setNodeRef} id={id} className="group">
      {blockPaths[type].map((path, index) => {
        const pathId = `${id}_path_${index}`;
        const { setNodeRef: setPathRef, isOver: isPathOver } = useDroppable({
          id: pathId,
        });

        return (
          <path
            key={index}
            ref={setPathRef}
            transform={`translate(${x}, ${y})`}
            className={`${type.toLowerCase()}_fill1 hover:stroke-red-500`}
            fill={isPathOver ? "green" : path.fill}
            strokeWidth={4}
            paintOrder="fill"
            clipPath="fill-box"
            d={path.d}
          />
        );
      })}
    </g>
  );
};

const maxWidth = (width: number) => Math.max(500, width);

export default SvgPattern;
