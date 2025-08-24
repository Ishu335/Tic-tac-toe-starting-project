
export default function Log({turnState}){


    return( <ol id='log'>
        {turnState.map(turnState=><li key={`${turnState.square.row}${turnState.square.col}`}>
            {turnState.player} Selected {turnState.square.row},{turnState.square.col} 
            </li>)}
        </ol>
    );
}