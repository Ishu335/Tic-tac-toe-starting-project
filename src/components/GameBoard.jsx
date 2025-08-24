export default function GameBoard({ onSelectSqure, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={`row-${rowIndex}`}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={`cell-${rowIndex}-${colIndex}`}>
                <button
                  onClick={() => onSelectSqure(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
