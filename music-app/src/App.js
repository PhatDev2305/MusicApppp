import React , { useState } from 'react';
import MusicControl from './components/MusicControl';
import MusicForm from './components/MusicForm';
import './CSS/App.css'
import './CSS/grid.css'
import musics from './music/musics.js'



function App() {

  const [song, setSong] = useState(musics[0])
  const [togglePlay, setTogglePlay] = useState('')

  const musicLength = musics.length

  const onReceived = (song) => {
    setSong(song);
  }

  const onReceivePreviosSong = (data) => {
    let result;
    result = musics.map(music => {
      return music.id === (data - 1) ? music : null
    })
    for (let item of result) {
      if(item) {
        result = item
        break
      }
    }
    setSong(result)
    return result
  }

  const onReceiveNextSong = (data) => {
    let result;
    result = musics.map(music => {
      return music.id === (data + 1) ? music : null
    })
    for (let item of result) {
      if(item) {
        result = item
        break
      }
    }
    setSong(result)
    return result
  }


  const handleAble = (data) => {
    setSong(data)
  }

  const togglePlayFunc = (data) => {
    setTogglePlay(data)
  }


  return (
    <div className="App">
      <div className="wide grid">
        {/* Background */}
        <div className="bg container">
          <div className="bg-m"></div>
          <div className="bg-s1"></div>
          <div className="bg-s2"></div>
          {/* Main */}
          <MusicForm
            musics = {musics}
            onReceived = {onReceived}
            song = { song }
            togglePlay = {togglePlay}
          />
          {/* End */}
          {/* Player */}
          <MusicControl
            songInfo = {song}
            onReceivePreviosSong = {onReceivePreviosSong}
            onReceiveNextSong = {onReceiveNextSong}
            handleAble = { handleAble }
            musicLength = { musicLength }
            togglePlayFunc = { togglePlayFunc }
          />
          {/* End */}
        </div>
      </div>
    </div>
  );
}

export default App;
