import { useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import './Music.css';

function Music() {

    const playlist = [{'songName': 'Need Ya', 'img': 'audio/song1/art.jpg', 'src': 'audio/song1/song1.mp3', 'artist':'Syn Cole', 'duration':'160'}, {'songName': 'If I Disappear (ft. Tom Mårtensson)', 'img': 'audio/song2/art.png', 'src':'audio/song2/song2.mp3', 'artist':'Tobu', 'duration':'208'}, {'songName':'On & On (feat. Daniel Levi) [NCS Release]', 'img':'audio/song3/art.jpg', 'src':'audio/song3/song3.mp3', 'artist':'Cartoon', 'duration': '208'}, {'songName':'Safe & Sound', 'img':'audio/song4/art.jpg', 'src':'audio/song4/song4.mp3', 'artist':'DEAF KEV', 'duration':'309'}];
    const publicPath = process.env.PUBLIC_URL;
    let tempSongIndex = 0;
    const [currentTime=0, setCurrentTime] = useState();
    const [newSongTime=0, setNewSongTime] = useState();
    const [audioState=false, setAudioState] = useState();
    const [currentSongIndex=0, setCurrentSongIndex] = useState();
    const [currentArtIndex=0, setCurrentArtIndex] = useState();
    const [cursorX, setCursorX] = useState();
    const [playerX, setPlayerX] = useState();
    let audio = document.querySelector('audio');

    const onPlayButtonClicked = () => {
        let audio = document.querySelector('audio');
        tempSongIndex = 0;
        if (!audio.src || (currentSongIndex >= playlist.length) || (currentSongIndex <= -1)) {
            tempSongIndex=0;
            selectNewSong(playlist[tempSongIndex]);
        } else if (audio.paused) {
            audio.play();
            tempSongIndex = currentSongIndex;
            //setCurrentTime(audioData.newAudioTime);
            let curPercent = (audio.currentTime / audio.duration) * 100;
            animateProgressBar(curPercent, 100, playlist[tempSongIndex].duration);
        } else {
            audio.pause();
            setAudioState(false);
            let curPercent = (audio.currentTime / audio.duration) * 100;
            let audioData = {'newAudioTime': audio.currentTime, 'progressPercent': curPercent};
            setCurrentTime(audioData.newAudioTime);
            pauseProgressBar(audioData);
        }
    }

    const onChangeNextSong = () => {
        let audio = document.querySelector('audio');
        tempSongIndex = currentSongIndex+1;
        if (audio.src || ((tempSongIndex < playlist.length) && (tempSongIndex > -1))) {
            if (tempSongIndex >= playlist.length) {
                tempSongIndex = 0;
            }
            selectNewSong(playlist[tempSongIndex]);
        }
    }

    const onChangePreviousSong = () => {
        let audio = document.querySelector('audio');
        tempSongIndex = currentSongIndex-1;
        if (audio.src || (tempSongIndex < playlist.length)) {
            if (tempSongIndex < 0) {
                tempSongIndex = playlist.length-1;
            }
            if (audio.currentTime > 4) {
                selectNewSong(playlist[currentSongIndex]);
            } else {
                selectNewSong(playlist[tempSongIndex]);
            }
        }
    }

    const onTimeSelect = () => {
        //need to cleanup
        let audio = document.querySelector('audio');
        tempSongIndex = currentSongIndex;
        if (audio.src || ((tempSongIndex < playlist.length) && (tempSongIndex > -1))) {
            let audioData = getCurrentSongTime(audio);
            audio.currentTime = audioData.newAudioTime;
            setCurrentTime(audioData.newAudioTime);
            animateProgressBar(audioData.progressPercent, 100, playlist[tempSongIndex].duration);
        }
    }

    const getCurrentSongTime = (audio, state) => {
        //if (state) {
            //let x = document.getElementsByClassName('songLength')[0];
            //let newX = getComputedStyle(x).width;
            //console.log(newX);
            //find out current %
            //let newP = (audio.currentTime / audio.duration) * 100;
            //let newWidth = newP * newX;
            //let audioData = {'newAudioTime': audio.currentTime, 'progressPercent': newP};
            //return audioData;
            //console.log(state);
        //} else {
            let x1 = playerX;
            let x2 = cursorX;
            let x3 = newSongTime;
            let x4T = document.getElementsByClassName('songLength')[0].firstChild;
            let x4 = parseInt(getComputedStyle(x4T).width);
            let newWidth = (x2 - x1);
            let progressRatio = (newWidth / x4);
            let progressPercent = Math.floor(progressRatio * 100);
            let newAudioTime = x3;
            let audioData = {'newAudioTime': newAudioTime, 'progressPercent': progressPercent};
            return audioData;
        //}
    }

    /**
    const onTimeSelect = () => {
        //need to cleanup
        let audio = document.querySelector('audio');
        if (audio.src || ((tempSongIndex < playlist.length) && (tempSongIndex > -1))) {
            let x1 = parseInt(playerX);
            let x2 = parseInt(cursorX);
            let xCoordDiff = (x1 - x2);
            xCoordDiff = Math.abs(xCoordDiff);
            let playerLength = document.getElementsByClassName('controlsContainer')[0];
            let playerLengthPX = getComputedStyle(playerLength).width;
            let playerLengthInt = parseInt(playerLengthPX);
            let progressPercent = Math.floor((xCoordDiff / playerLengthInt) * 100);
            let newAudioTime = (progressPercent / 100) * audio.duration;
            audio.currentTime = newAudioTime;
            setCurrentTime(newAudioTime);
            document.getElementById('songProgress').style.width = `${progressPercent}%`;
            animateProgressBar(progressPercent, 100, 0);
        }
    }
    **/

    const getCursorCoords = (e) => {
        //let item = document.getElementById('songProgress');
        //let style = getComputedStyle(item);
        //let style2 = getComputedStyle(x);
        //console.log(style.width + ' and ' + style2.width);

        
        //get x of click, subtract padding and margin to get starting x coord of progressbar, then use ratio on it
        //controls container margin left
        //buttoncontainer padding left
        //child div margin left
        let x = document.getElementsByClassName('songLength')[0].firstChild;
        let progressWidth = parseInt(getComputedStyle(x).width);
        let tempCursorX = parseInt(e.clientX);
        let musicC = document.getElementsByClassName('musicAppContainer')[0];
        let buttonsC = document.getElementsByClassName('buttonContainer')[0];
        let controlsML = parseInt(getComputedStyle(musicC).marginLeft);
        let progressPL = parseInt(getComputedStyle(x).marginLeft);
        //add together and determine coord where progressbar starts
        let progressStartX = controlsML + progressPL;
        let clickDiff = tempCursorX - progressStartX;
        let newSongDurRat = (clickDiff / progressWidth);
        //then add to progressbar based on ratio
        let tempNewSongTime = (playlist[currentSongIndex].duration * newSongDurRat);
        setPlayerX(progressStartX);
        setCursorX(tempCursorX);
        setNewSongTime(tempNewSongTime);
        //let pageLeftMargin = style.marginLeft;
        //let playerXCoord = parseInt(pageLeftMargin);
        //setPlayerX(playerXCoord);
        //setCursorX(e.clientX);
    }

    //const updateCurrentCoords = (audio) => {
    //    console.log('current time' + audio);
    //    setCurrentTime(audio);
    //}

    const updateMetaData = (index) => {
        if ((index < playlist.length) && (index > -1)) {
            document.getElementById('albumArt').src = (publicPath + playlist[index].img);
            document.getElementById('songName').innerHTML = playlist[index].songName;
            document.getElementById('artistName').innerHTML = playlist[index].artist;
        }
    }

    const loadPlaylist = () => {
        //if (!document.getElementsByClassName('libraryDeckContainer')[0]) {

            playlist.forEach((song) => {
                let tempSongContainer = document.createElement('div');
                let tempSongName = document.createElement('div');
                let tempSongArtist = document.createElement('div');
                let tempSongImg = document.createElement('img');
                tempSongContainer.className = 'libraryDeckContainer'
                tempSongContainer.addEventListener('click', () => {
                    selectNewSong(song);
                })
                tempSongArtist.innerHTML = song.artist;
                tempSongImg.src = song.img;
                tempSongName.innerHTML = song.songName;
                tempSongContainer.appendChild(tempSongImg);
                tempSongContainer.appendChild(tempSongName);
                tempSongContainer.appendChild(tempSongArtist);
                document.getElementById('libraryDeck').appendChild(tempSongContainer);
            });

        //}
    }

    const selectNewSong = (obj) => {
        console.log('select new song index:' + obj);
        let audio = document.querySelector('audio');
        audio.volume = .5;
        let newSongIndex = playlist.findIndex(x => x.src === obj.src);
        console.log(newSongIndex);
        audio.src = publicPath + playlist[newSongIndex].src; 
        audio.play();
        let audioData = {'newAudioTime': 0, 'progressPercent': 0};
        pauseProgressBar(audioData);
        setCurrentSongIndex(newSongIndex);
        setCurrentArtIndex(newSongIndex);
        updateMetaData(newSongIndex);
        setAudioState(true);
        setCurrentTime(audio.currentTime);
        console.log(audio.duration);
        animateProgressBar(0, 100, playlist[newSongIndex].duration);
    }

    //create animation
    const animateProgressBar = (prevWidth, newWidth, songDuration) => {
        let audio = document.querySelector('audio');
        let progressBar = document.getElementById('songProgress');
        let durationDiff = songDuration;
        let playButton = document.getElementById('playIcon');
        console.log('full song length' + durationDiff + ' p ' + prevWidth + ' s ' + newWidth);
        if (prevWidth > 0) {
            durationDiff = songDuration - (songDuration * (prevWidth / 100));
            console.log(durationDiff);
        }
        let progressBarDistance = [
            { width: `${prevWidth}%` },
            { width: `${newWidth}%` }
        ];
        let progressBarTiming = {
            duration: durationDiff * 1000,
        };
        if (audio.paused) {
            console.log('prev:' + prevWidth + ' new: ' + newWidth);
            progressBar.style.width = `${prevWidth}%`;
            document.getElementById('pauseIcon').style.display = 'none';
            document.getElementById('playIcon').style.display = 'inline-block';
        } else {
            progressBar.animate(progressBarDistance, progressBarTiming);
            document.getElementById('playIcon').style.display = 'none';
            document.getElementById('pauseIcon').style.display = 'inline-block';
        }
    }

    //assign animation


    //stop animation
    const pauseProgressBar = (audioData) => {
        let anim = document.getElementById('songProgress').getAnimations();
        anim.forEach( (x) => {
            x.cancel();
        });
        console.log(audioData);
        document.getElementById('pauseIcon').style.display = 'none';
        document.getElementById('playIcon').style.display = 'inline-block';
        document.getElementById('songProgress').style.width = `${audioData.progressPercent}%`
    }

    const changeSongAfterEnd = () => {
        let audio = document.querySelector('audio');
        setCurrentTime(audio.currentTime);
        let tempSongIndex = currentSongIndex+1;
        if (audio.currentTime === audio.duration) {
            if (tempSongIndex >= playlist.length) {
                setCurrentSongIndex(0);
                tempSongIndex = 0;
            } else {
                setCurrentSongIndex(tempSongIndex);
            }
            selectNewSong(playlist[tempSongIndex]);
        }
        if ((document.getElementById('albumArt').src === null) || (currentSongIndex !== tempSongIndex)) {
            setCurrentArtIndex(tempSongIndex);
        }
    }

    /**
    useEffect(() => {
        let audio = document.querySelector('audio');
        console.log('useEffect ran');
        if (audio) {
            if (audioState) {
                //setCurrentTime((currentTime));
                let tempWidthObj = document.getElementById('songProgress').style.width;
                let tempWidth = parseInt(tempWidthObj);
                let progressPercent = Math.fround((audio.currentTime / audio.duration)*100);
                if (progressPercent !== tempWidth) {
                    //try other option: use animations to update progress bar over duration based on duration - current time
                    document.getElementById('songProgress').style.width = `${progressPercent}%`;
                }
            }
        }
    }, [currentTime, audioState]);
    **/

    useEffect(() => {
        let audio = document.querySelector('audio');
        if (audio) {
            changeSongAfterEnd();
        }
    }, [currentSongIndex, publicPath, playlist, currentArtIndex]);

    useEffect(() => {
        let audio = document.querySelector('audio');
        audio.addEventListener('ended', () => {
            setCurrentSongIndex(currentSongIndex+1);
        });
        loadPlaylist();
        console.log('audio set');
    }, []);

    return(
        <div className='musicAppContainer'>
            <audio id='audioPlayer' preload='metadata'></audio>
            <div className='controlsContainer'>
                <div className='songInfoContainer'>
                    <img onClick={loadPlaylist} id='albumArt'></img>
                    <div id='songName'></div>
                    <div id='artistName'></div>
                </div>
                <div className='buttonContainer'>
                    <div className='playButtonContainer'>
                        <button id='previousButton' onClick={onChangePreviousSong}><FontAwesomeIcon icon={faBackward} /></button>
                        <button id='playButton' onClick={onPlayButtonClicked}><FontAwesomeIcon id='playIcon' icon={faPlay} /><FontAwesomeIcon style={{display:'none'}} id='pauseIcon' icon={faPause} /></button>
                        <button id='nextButton' onClick={onChangeNextSong}><FontAwesomeIcon icon={faForward} /></button>
                    </div>
                    <div className='songLength'>
                        <div onMouseMove={getCursorCoords} onClick={onTimeSelect}>
                            <div id='songProgress'>
                                <div id='songProgressIcon'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='libraryContainer'>
                <div className='libraryTopBar'>
                    <h2>Library</h2>
                    <div>bop</div>
                </div>
                <div id='libraryDeck'></div>
            </div>
            <div className='queueContainer'>
                <div className='queueTopBar'>
                    <h2>Artist Name</h2>
                    <div className='artistInfoTab'>
                        <div className='artistNewReleases'>
                            <h3>Recent Releases</h3>
                        </div>
                        <div className='artistSimilar'>
                            <h3>Similar Songs</h3>
                        </div>
                    </div>
                </div>
                <div id='queueDeck'>

                </div>
            </div>
        </div>
    );
}

export default Music;