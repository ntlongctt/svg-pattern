import { Input } from "./shadcn/Input";
import SvgPattern from "./SvgPattern";
import { observer } from "@legendapp/state/react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { $setting } from "@/store/setting";

const Container = observer(() => {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full flex gap-8">
        <div className="flex flex-col">
          <div className="w-40">
            <Setting />
          </div>
        </div>
        <div className="flex flex-col gap-28">
          <SvgPattern />
          <BlockSelect />
        </div>
      </div>
    </DndContext>
  );
});

const handleDragEnd = (event) => {
  const { over } = event;
  if (over) {
    console.log(`Dropped on path id: ${over.id}`);
  }
};

const BlockSelect = () => {
  return (
    <div className="flex gap-4 p-4 border-2 border-gray-300">
      <Block1 />
      <Block2 />
    </div>
  );
};

const Block2 = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "fabric_128",
    data: {
      type: "fabric",
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <svg
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      role="presentation"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      id="block1"
      className="ui-draggable ui-draggable-handle selectedClass"
    >
      <path
        className="block1_fill1"
        fill="green"
        d=" M 0 0 L 0 100 L 100 0 Z"
      />
      <path
        className="block1_fill2"
        fill="yellow"
        d=" M 0 100 L 100 100 L 100 0 Z"
      />
    </svg>
  );
};
const Block1 = () => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "block_38",
      data: {
        type: "block",
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <svg
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      role="presentation"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      id="block1"
      className="ui-draggable ui-draggable-handle selectedClass"
    >
      <path
        className="block1_fill1"
        fill="#bbbbbb"
        d=" M 0 0 L 0 100 L 100 0 Z"
      />
      <path
        className="block1_fill2"
        fill="#666666"
        d=" M 0 100 L 100 100 L 100 0 Z"
      />
    </svg>
  );
};

const Setting = observer(() => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="col">Col:</label>
      <Input
        id="col"
        onChange={(v) =>
          $setting.col.set(Number.parseInt(v.target.value || ""))
        }
        value={$setting.col.get()}
        type="number"
        placeholder="col"
        max={10}
        min={1}
      />
      <label>row:</label>
      <Input
        onChange={(v) =>
          $setting.row.set(Number.parseInt(v.target.value || ""))
        }
        value={$setting.row.get()}
        type="number"
        placeholder="row"
        max={10}
        min={1}
      />
    </div>
  );
});

export default Container;
