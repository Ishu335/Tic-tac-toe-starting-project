import { useState } from "react";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSqure,activePlayerSymbole}) {
    const [gameBoard,setGameBoard]=useState(initialGameBoard)


    function handelsSelectedSqure(rowIndex,colIndex)
    {
        setGameBoard((preGameBoard)=>{
            const updatedBoard=[...preGameBoard.map(innerArray=>[...innerArray])];

            updatedBoard[rowIndex][colIndex]=activePlayerSymbole;
            return updatedBoard
    });

      onSelectSqure();
    }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>handelsSelectedSqure(rowIndex,colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
