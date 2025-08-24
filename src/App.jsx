import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import Log  from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from './winning_combination.js'
import GameOver from "./components/GameOver.jsx";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  
      let currentPlayer='X';
      if(gameTurns.length>0  && gameTurns[0].player=='X'){
        currentPlayer='O';
      }
      return currentPlayer;
}

function App() 
{
      const [gameTurns,setGameTurns]=useState([]);
      // const [activePlayer,setActivePlayer]=useState('X')
      let activePlayer=deriveActivePlayer(gameTurns);
      

       let gameBoard=[...initialGameBoard.map(innerarray=> [...innerarray])];

      for(const turn  of  gameTurns)
        {
        const  {square,player}=turn;
        const {row,col}=square;
        gameBoard[row][col]=player;
      }

      let winner;
     for (const combination of WINNING_COMBINATIONS)
      {
          const fistSqureSymbole=gameBoard[combination[0].row][combination[0].column]
          const secondSqureSymbole=gameBoard[combination[1].row][combination[1].column]
          const thirdSqureSymbole=gameBoard[combination[2].row][combination[2].column]

          if(fistSqureSymbole && fistSqureSymbole===secondSqureSymbole&& fistSqureSymbole===thirdSqureSymbole)
          {
              winner=fistSqureSymbole;
          }
     }

     function handelRestart(){
      setGameTurns([]);
     }


    let  hasDraw=gameTurns.length===9 && !winner;
    function handelSelectSquare(rowIndex,colIndex)
    {
      // setActivePlayer((currentActivePlayer)=>currentActivePlayer==='X'?'O':'X');

      setGameTurns(prevTurns=>{

        let currentPlayer=deriveActivePlayer(prevTurns);
        if(prevTurns.length>0  && prevTurns[0].player=='X')
          {
          currentPlayer='O';
        }
        const updatedTurns=[

          {square:{row:rowIndex,col:colIndex},player:activePlayer},
          ...prevTurns,
        ];
        return updatedTurns;
      });
    }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer=='X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer=='O'}/>
        </ol>
        {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/> }
        <GameBoard onSelectSqure={handelSelectSquare} board={gameBoard}/>
      </div>
      <Log turnState={gameTurns}/>
    </main>
  );
}

export default App;
