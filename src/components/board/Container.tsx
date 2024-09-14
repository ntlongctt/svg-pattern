const col = 3;
const row = 3;

const Container = () => {
  return (
    <div className="relative">
      <BorderOne>
        <Grid />
      </BorderOne>
    </div>
  );
};

const BorderOne = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        position: "relative",
        padding: 40,
        background: "wheat",
      }}
    >
      <div
        style={{
          top: 0,
          left: 0,
          position: "absolute",
        }}
      >
        <div
          style={{
            background: "yellow",
            position: "absolute",
            height: 40,
            left: 0,
            top: 0,
          }}
        ></div>
        <div
          style={{
            background: "yellow",
            position: "absolute",
            height: 40,
            left: 0,
            top: "100%",
          }}
        ></div>
        <div
          style={{
            background: "yellow",
            position: "absolute",
            height: 40,
            left: 0,
            top: "100%",
          }}
        ></div>
      </div>

      {children}
    </div>
  );
};

const HorizontalBorder = () => {
    const style = {
        background: "#ff5722",
        position: "absolute",
        height: 40,
        left: 0,
        top: 0,
    }
    return (
        <div style={{}}>
            <div></div>
        </div>
    )
}

const Grid = () => {
  return (
    <div
      style={{
        width: col * 100,
        height: row * 100,
      }}
      className="flex"
    >
      {Array.from({ length: row }).map((_, rowIndex) =>
        Array.from({ length: col }).map((_, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} col={colIndex} row={rowIndex} />
        ))
      )}
    </div>
  );
};

export default Container;

const Cell = ({ col, row }: { col: number; row: number }) => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        position: "absolute",
        transform: `translate(${col * 100}px, ${row * 100}px)`,
        border: "1px solid grey",
      }}
      className=""
    ></div>
  );
};
