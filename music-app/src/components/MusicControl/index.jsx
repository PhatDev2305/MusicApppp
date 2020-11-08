import React, { useRef }  from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';


MusicControl.PropsType = {
    songInfo : PropTypes.object,
    musicLength : PropTypes.number,
    onReceivePreviosSong : PropTypes.func,
    onReceiveNextSong : PropTypes.func,
    handleAble : PropTypes.func,
    togglePlayFunc : PropTypes.func,
}

MusicControl.defaultProps = {
    songInfo : {},
    onReceivePreviosSong : null,
    onReceiveNextSong : null,
    handleAble : null,
    togglePlayFunc : null,
}

function MusicControl (props) {
    const { 
        songInfo,
        onReceivePreviosSong, 
        onReceiveNextSong, 
        handleAble, 
        musicLength,
        togglePlayFunc,
        } = props;

    const audio = new Audio();
    const audioRef = useRef(audio);
    const [song, setSong] = useState()
    const [songOnPlay, setSongOnPlay] = useState()
    const [togglePlay , setTogglePlay] = useState(false)
    const [play, setPlay] = useState('')
    const [duration, setDuration] = useState(0)
    const [current, setCurrent] = useState(0)
    const [loop, setLoop] = useState(false)
    const [volume, setVolume] = useState(100)
    const [show, setShow] = useState(false)
    const [volumeProcess, setVolumeProcess] = useState(
        {
            width : volume + "%"
        }
    )
    const [bar, setBar] = useState(
        {
            width: "0%"
        }
    )


    // Func


    // SongOnPlay
    useEffect (
        () => {
            if(!song) return
            audioRef.current.src = song
            audioRef.current.addEventListener('loadedmetadata', (e) => {
                setDuration(Math.floor(e.target.duration))
            }) 
            document.title = songOnPlay.name
            return
        }
    ,[songOnPlay])


    useEffect (
        () => {
            if (!togglePlay) {
                audioRef.current.pause()
                return
            }
            audioRef.current.play()
            return
        }
    ,[togglePlay])

    // Xử lí play
    useEffect (
        () => {
            if(play === '') return
            audioRef.current.play()
        }
    ,[play])


    // Xử lí khi current thay đổi
    useEffect (
        () => {
            if(!current) return
            setBar({
                width: current * 100 + '%'
            })
            if(current * duration === duration) {
                if(songOnPlay.id !== musicLength && !loop) {
                    handleNextItem(songOnPlay)
                }
            }
        }
        
    ,[current])

    audioRef.current.addEventListener('timeupdate', () => {
        if(!duration) return
        setCurrent(
            Number.parseFloat((audioRef.current.currentTime / duration).toFixed(4)) > 1 ? 1 : Number.parseFloat((audioRef.current.currentTime / duration).toFixed(4))
        )
    })

    const handleGetCurrent = (e) => {
        const width = e.target.offsetWidth
        const position = e.clientX
        const result = (Number.parseFloat((position / width).toFixed(4)) > 1) ? 1 : Number.parseFloat((position / width).toFixed(4))
        setBar({
            width : result * 100 + "%"
        })
        audioRef.current.currentTime = result * duration
    }


    const convertTime = (current, duration, type ) => {
        if(!current && !duration) {
            return "00:00"
        }
        if(type === "currentTime" ) {
            if(!current) return "00:00"
            current = Math.floor(current * duration)
            let min = Math.floor(current / 60)
            let sec = current % 60
            let result = ("0"+min).slice(-2) + ":" + ("0"+sec).slice(-2)
            return result
        } else if (type === "duration" ) {
            let min = Math.floor(duration / 60) 
            let sec = Math.floor(duration % 60)
            let result = ("0"+min).slice(-2) + ":" + ("0"+sec).slice(-2)
            return result
        }
    }


    const handlePlayItem = (songInfo) => {
        setSong(songInfo.src)
        setTogglePlay(!togglePlay)
        setSongOnPlay(songInfo)
        togglePlayFunc(togglePlay)
    }

    //  Xử lí việc lấy phần tử bài hát trước theo id
    const handlePreviousItem = (songInfo) => {
        if(songInfo.id === 1) {
            alert('ko the lay item nay')
            return
        } else {
            const result = onReceivePreviosSong(songInfo.id)
            handleAble(result, togglePlay)
            setSongOnPlay(result)
            setSong(result.src)
            setPlay(!play)
            setTogglePlay(true)
        }
    }

    // Xử lí việc lấy phần tử tiếp theo của bài hát ( theo id )
    const handleNextItem = (songInfo) => {
        if(songInfo.id === musicLength) {
            alert('ko the lay item nay')
            return
        } else {
            const result = onReceiveNextSong(songInfo.id)
            handleAble(result, togglePlay)
            setSongOnPlay(result)
            setSong(result.src)
            setPlay(!play)
            setTogglePlay(true)
        }
    }

    // Xử lí redo
    const handleClickRedo = (data) => {
        if(!data) {
            alert("vui lòng chọn 1 bài nhạc")
            return
        }
        if(!loop) {
            console.log('da loop');
            audioRef.current.loop = true
            setLoop(!loop)
        } else {
            console.log('da un loop');
            audioRef.current.loop = false
            setLoop(!loop)
        }
    }

    const handleChangeVolume = (e) => {
        setVolume(Number.parseInt(e.target.value))
        setVolumeProcess({
            width: volume + "%"
        })
        audioRef.current.volume = volume / 100
    }

    const handleToggleShowBtn = () => {
        setShow(!show)
    }


    return (
        <div className="m-12 c-12 l-12">
            <div 
                className="process__bar"  
                onClick = { handleGetCurrent } 
            >
                <div 
                    className="fill__bar"
                    style = { bar }
                ></div>
            </div>
            <footer className="c-12 m-12 l-12 player">
                <div className="row">
                    <div className="player__info l-4 c-4 m-4 col">
                        <div className="row">
                            <div className="l-8 m-8 c-8">
                                <span className="player__info--name">
                                    {
                                        songOnPlay ? songOnPlay.name : 'Hãy chọn 1 bản nhạc'
                                    }
                                </span>
                                <br/>
                                <span className="player__info--author">
                                    {
                                        songOnPlay ? songOnPlay.artist : 'Hãy chọn 1 bản nhạc'
                                    }
                                </span>
                            </div>
                            <div className="l-4 m-4 c-4 player__info--time">
                                <span >
                                    {convertTime(current, duration, "currentTime") +
                                    "/" +convertTime (current, duration , "duration")
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="player__box l-8 c-8 m-8 col">
                        <div className="player__box--controls l-8 c-8 m-8">
                                <i 
                                    className={loop ? "fas fa-redo on-used-redo" : "fas fa-redo"}
                                    onClick={ () => handleClickRedo(songOnPlay) }
                                ></i>
                                <i 
                                    
                                    className="fas fa-step-backward"
                                    onClick = { () => handlePreviousItem(songInfo)}
                                ></i>
                                <i 
                                    className={togglePlay ? `fas fa-pause ` : 'fas fa-play'}
                                    onClick = {() => handlePlayItem(songInfo)}
                                ></i>
                                <i 
                                    className="fas fa-step-forward"
                                    onClick = { () => handleNextItem(songInfo)}
                                ></i>
                                <i className="fas fa-heart"></i>
                                {/* <i className="fas fa-volume-mute"></i> */}
                            </div>
                        <div className="player__box--volume l-4 m-4 c-4">
                            <div className="row col">
                                <div className="l-3 m-3 c-3">
                                    <i 
                                        onClick = {handleToggleShowBtn}
                                        className={volume === 0 ? "fas fa-volume-mute" : "fas fa-volume-up"}
                                    ></i>
                                </div>
                                <div 
                                    className= {show ? "volume--process show l-9 c-9 m-9" : "volume--process l-9 c-9 m-9"}
                                >
                                    <input
                                        type="range"
                                        min = {0}
                                        max = {100}
                                        step = {1}
                                        value = {volume}
                                        onChange = {handleChangeVolume}
                                        onClick = {handleChangeVolume}
                                    />
                                    <div 
                                        className="selector-bar"
                                    >
                                        <span 
                                            style={ volumeProcess }
                                            className="fill-bar"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MusicControl;