import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Game() {
  const [songName, setSongName] = useState("i give up");
  const [lyrics, setLyrics] = useState("");
  const [songsArray, setArray] = useState([])
   const [winner, setWinner] = useState(false);
   const [artistName, setArtistName] = useState("")


  async function randomizeTrack() {
    const pageNum = Math.ceil(Math.random()) * 15
    if (!songsArray.length){
      axios.get(`/api/getsongs/${pageNum}`)
        .then(arr => {
          setArray(arr);
        })
    }
    const index = Math.floor(Math.random()) * (songsArray.length)
    const getRandomSongObj = songsArray[index]
    setArray(prevState => prevState.splice(index, 1));

    const {track_id, track_name, artist_name} = getRandomSongObj;

    setArtistName(artist_name)
    setSongName(track_name.toLowerCase())
    axios.get(`/api/getLyrics/${track_id}`)
      .then(lyrics => setLyrics(lyrics))
      .catch((err) => console.log("error in getLyrics", err))
  }


    
  function compareAnswer(input) {
    if(input.target.value.toLowerCase() === songName.toLowerCase()){
      setWinner(true)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="contentBox">
        <div className="gameContent">
          <div className="lyrics" style={{ width: "75%" }}>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
                <div
                  style={{
                    overflowY: "scroll",
                    height: "400px",
                    fontSize: "28px",
                    color: "black",
                    width: "800px",
                  }}>
                    {lyrics}
               
                </div>
          </div>
          <input onChange={input => compareAnswer(input)} />
          <br />
        </div>
      </div>
      {winner ? 
      <div id="winnerBox">
        <div id="winnerMessage"> 
          <h2 id="winnerHeader">You did it!</h2>
          <div className="content">Song-name: {songName}</div>
          <div className="content">Artist-name: {artistName}</div>
        </div>
      </div>
        :null}
    </div>
  );
}

export default Game;
