import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import Log  from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from './winning_combination.js'
import GameOver from "./components/GameOver.jsx";

// Players name Initial
const PLAYERS={
X:'Player 1',
O:'Player 2'
}
// Initial Game Arrya
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Logic for Turn Shifting
function deriveActivePlayer(gameTurns)
{
      let currentPlayer='X';
      if(gameTurns.length>0  && gameTurns[0].player=='X')
      {
        currentPlayer='O';
      }
      return currentPlayer;
}

function deriveGameBoard(gameTurns)
{
      let gameBoard=[...INITIAL_GAME_BOARD.map(innerarray=> [...innerarray])];
        for(const turn  of  gameTurns)
          {
          const  {square,player}=turn;
          const {row,col}=square;
          gameBoard[row][col]=player;
        }
        return gameBoard;
}

// Logic of which Player is Active 
function deriveWinner(gameBoard,players)
{
    let winner;
    for (const combination of WINNING_COMBINATIONS)
      {
          const fistSqureSymbole=gameBoard[combination[0].row][combination[0].column]
          const secondSqureSymbole=gameBoard[combination[1].row][combination[1].column]
          const thirdSqureSymbole=gameBoard[combination[2].row][combination[2].column]

          if(fistSqureSymbole && fistSqureSymbole===secondSqureSymbole&& fistSqureSymbole===thirdSqureSymbole)
          {
              winner=players[fistSqureSymbole];
          }
    }
    return winner;
}

function App() 
{
    // Status
    const [players,setPlayers]=useState(PLAYERS)
    const [gameTurns,setGameTurns]=useState([]);
    
    // Const Variable of Helper functions
    const activePlayer=deriveActivePlayer(gameTurns);
    const gameBoard=deriveGameBoard(gameTurns);
    const winner =deriveWinner(gameBoard,players);
    let  hasDraw=gameTurns.length===9 && !winner;
    
    // Restart Logic
    function handelRestart()
    {
      setGameTurns([]);
    }

    // Store the Game Pattens
    function handelSelectSquare(rowIndex,colIndex)
    {
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

  //Player Name Change 
    function handlePlyerNameChange(symbole,newName)
    {
      setPlayers(prePlayer=>{
        return{
          ...prePlayer,
          [symbole]:newName
        }
      });
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X}
                  symbol="X" 
                  isActive={activePlayer=='X'}
                  onChangeName={handlePlyerNameChange}/>

          <Player initialName={PLAYERS.O} 
                  symbol="O" 
                  isActive={activePlayer=='O'}
                  onChangeName={handlePlyerNameChange}/>
        </ol>
        {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/> }
        <GameBoard onSelectSqure={handelSelectSquare} board={gameBoard}/>
      </div>
      <Log turnState={gameTurns}/>
    </main>
  );
}

export default App;
