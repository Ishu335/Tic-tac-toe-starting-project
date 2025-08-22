import {useState} from 'react'
export default function Player({initialName,symbol})
{
    const [isEditing,setIsEditing]=useState(false)
    const [playerName,setPlayerName]=useState(initialName)

    function handleEditClick()
    {
        setIsEditing(editing=>!editing) 
    }

    function nameChange(event)
    {
      console.log(event.target)
      const  valueProvide=event.target.value
      setPlayerName(valueProvide)
    }

    let editedPlayerName=<span className="player-name">{playerName}</span>

    if(isEditing)
    {
        editedPlayerName=<input type="text" required value={playerName} onChange={nameChange}/>
    }
  
    return <li>
          <span className="player">
            {editedPlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
        </li>

}