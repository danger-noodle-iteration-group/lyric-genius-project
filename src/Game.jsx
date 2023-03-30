import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Game() {
  const [songName, setSongName] = useState("i give up");
  const [lyrics, setLyrics] = useState("");
  const [songsArray, setArray] = useState([])
  const [winner, setWinner] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [usedPages, setUsedPages] = useState([]);
  

  useEffect(() => {
    
    async function getSongs() {
      let pageNum = Math.ceil(Math.random() * 20);
      while (usedPages.includes(pageNum)) {
        pageNum = Math.ceil(Math.random() * 20);
      }
      setUsedPages([...usedPages, pageNum]);
      const response = await axios(`/api/getsongs/${pageNum}`);
      setArray(response.data);
    }
    if (songsArray.length === 0) getSongs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songsArray])

  async function randomizeTrack() {

    const index = Math.floor(Math.random()) * (songsArray.length)
    const getRandomSongObj = songsArray[index];
    const copy = [...songsArray];
    copy.splice(index, 1);
    setArray(copy);
    const {track_id, track_name, artist_name} = getRandomSongObj;

    setArtistName(artist_name)
    setSongName(track_name.toLowerCase())
    const lyrics = await axios.get(`/api/getLyrics/${track_id}`)
      setLyrics(lyrics.data)
      console.log(lyrics.data)
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
          <div className="lyrics" style={{ width: "75%", textAlign: 'center'}}>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
                <div
                  style={{
                    overflowY: "scroll",
                    height: "400px",
                    fontSize: "28px",
                    color: "black",
                    width: "85%",
                    margin: '0 auto 0',
                    whiteSpace: 'pre-line',
                    textAlign: 'center'
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
