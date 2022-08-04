import { useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faHome, faX } from '@fortawesome/free-solid-svg-icons';
import './Music.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Music() {

    const playlist = [{'songName': 'Need Ya', 'img': 'audio/song1/art.jpg', 'src': 'audio/song1/song1.mp3', 'artist':'Syn Cole', 'duration':'160'}, {'songName': 'If I Disappear (ft. Tom Mårtensson)', 'img': 'audio/song2/art.png', 'src':'audio/song2/song2.mp3', 'artist':'Tobu', 'duration':'208'}, {'songName':'On & On (feat. Daniel Levi) [NCS Release]', 'img':'audio/song3/art.jpg', 'src':'audio/song3/song3.mp3', 'artist':'Cartoon', 'duration': '208'}, {'songName':'Safe & Sound', 'img':'audio/song4/art.jpg', 'src':'audio/song4/song4.mp3', 'artist':'DEAF KEV', 'duration':'209'}];
    const [currentTime=0, setCurrentTime] = useState();
    const [newSongTime=0, setNewSongTime] = useState();
    const [audioState=false, setAudioState] = useState();
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [cursorX, setCursorX] = useState();
    const [playerX, setPlayerX] = useState();
    const [queueArray, setQueueArray] = useState();
    let audio = document.querySelector('audio');
    let newSongIndex;

    const onPlayButtonClicked = () => {
        let audio = document.querySelector('audio');
        let tempSongIndex = 0;
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
            let curPercent = (audio.currentTime / audio.duration) * 100;
            let audioData = {'newAudioTime': audio.currentTime, 'progressPercent': curPercent};
            setCurrentTime(audioData.newAudioTime);
            pauseProgressBar(audioData);
        }
    }

    const onChangeNextSong = () => {
        let audio = document.querySelector('audio');
        console.log('before' + currentSongIndex);
        let tempSongIndex = currentSongIndex+1;
        if (audio.src || ((tempSongIndex < playlist.length) && (tempSongIndex > -1))) {
            if (tempSongIndex > playlist.length-1) {
                tempSongIndex = 0;
            }
            console.log('after' + currentSongIndex);
            selectNewSong(playlist[tempSongIndex]);
            setCurrentSongIndex(tempSongIndex);
            console.log('after more' + tempSongIndex);
        }
    }

    const onChangePreviousSong = () => {
        let audio = document.querySelector('audio');
        let tempSongIndex = currentSongIndex-1;
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
        let tempSongIndex = currentSongIndex;
        if (audio.src || ((tempSongIndex < playlist.length) && (tempSongIndex > -1))) {
            let audioData = getCurrentSongTime(audio);
            audio.currentTime = audioData.newAudioTime;
            setCurrentTime(audioData.newAudioTime);
            animateProgressBar(audioData.progressPercent, 100, playlist[tempSongIndex].duration);
        }
    }

    const getCurrentSongTime = (audio) => {
            let x1 = playerX;
            let x2 = cursorX;
            let x3 = newSongTime;
            let x4T = document.getElementsByClassName('songLength')[0].firstChild;
            let x4 = parseInt(getComputedStyle(x4T).width);
            console.log('x1' + x1 + ' x2' + x2 + ' x3' + x3 + ' x4' + x4);
            let newWidth = (x2 - x1);
            let progressRatio = (newWidth / x4);
            let progressPercent = Math.floor(progressRatio * 100);
            let newAudioTime = x3;
            let audioData = {'newAudioTime': newAudioTime, 'progressPercent': progressPercent};
            return audioData;
    }

    const getCursorCoords = (e) => {
        
        //get x of click, subtract padding and margin to get starting x coord of progressbar, then use ratio on it
        //controls container margin left
        //buttoncontainer padding left
        //child div margin left
        let songLengthDiv = document.getElementsByClassName('songLength')[0];
        let x = document.getElementsByClassName('songLength')[0].firstChild;
        let progressWidth = parseInt(getComputedStyle(x).width);
        let tempCursorX = parseInt(e.clientX);
        let musicC = document.getElementsByClassName('musicAppContainer')[0];
        //bad one in chrome below
        let controlsML = parseInt(getComputedStyle(musicC).marginLeft);
        let progressPL = parseInt(getComputedStyle(x).marginLeft);
        //if (controlsML === 0) {
        let z1 = parseInt(window.innerWidth);
        let z2 = parseInt(getComputedStyle(musicC).width);
        controlsML = (z1 - z2) / 2;
        //}
        //if (progressPL === 0) {
        let z = parseInt(getComputedStyle(songLengthDiv).width);
        progressPL = (z - progressWidth) / 2;
        console.log(z + ' ' + progressWidth);
        //}
        console.log(controlsML);
        console.log(progressPL);
        if (window.location.href !== `${window.location.origin}/music`) {
            controlsML = 144;
        }
        //add together and determine coord where progressbar starts
        let progressStartX = controlsML + progressPL;
        console.log('start' + progressStartX + ' cursorx' + tempCursorX);
        let clickDiff = tempCursorX - progressStartX;
        let newSongDurRat = (clickDiff / progressWidth);
        //then add to progressbar based on ratio
        let tempNewSongTime = (playlist[currentSongIndex].duration * newSongDurRat);
        setPlayerX(progressStartX);
        setCursorX(tempCursorX);
        setNewSongTime(tempNewSongTime);
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
        console.log('select new song index:' + obj.src);
        let audio = document.querySelector('audio');
        let newSongIndex = playlist.findIndex(x => (x.src) === obj.src);
        console.log(newSongIndex);
        audio.src = window.location.origin + '/' + playlist[newSongIndex].src; 
        audio.load();
        audio.play();
        let audioData = {'newAudioTime': 0, 'progressPercent': 0};
        pauseProgressBar(audioData);
        setCurrentSongIndex(newSongIndex);
        setCurrentTime(audio.currentTime);
        fillQueueBar();
        animateProgressBar(0, 100, playlist[newSongIndex].duration);
    }

    //create animation
    const animateProgressBar = (prevWidth, newWidth, songDuration) => {
        let audio = document.querySelector('audio');
        let progressBar = document.getElementById('songProgress');
        let durationDiff = songDuration;
        console.log('full song length' + durationDiff + ' p ' + prevWidth + ' s ' + newWidth);
        if (prevWidth > 0) {
            durationDiff = songDuration - (songDuration * (prevWidth / 100));
            console.log(durationDiff);
        }
        let progressBarDistance = [
            { width: `${prevWidth}%` },
            { width: `${97}%` }
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

    const fillQueueBar = () => {
        let qD = [];
        let tempIndex = currentSongIndex;
        for (let x=0; x<10; x++) {
            let tempInfo = <div>
                <img src={ playlist[tempIndex].img }></img>
                <div>New Song Name</div>
                <div>{ playlist[tempIndex].artist }</div>
            </div>;
            qD.push(tempInfo);
        }
        setQueueArray(qD);
    }

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

    const closeMiniPlayer = () => {
        let audio = document.querySelector('audio');
        audio.pause();
        //document.getElementById('miniMusic').classList.remove('miniMusicBox');
        document.getElementsByClassName('musicAppContainer')[0].style.display = 'none';
        let curPercent = (audio.currentTime / audio.duration) * 100;
        let audioData = {'newAudioTime': audio.currentTime, 'progressPercent': curPercent};
        setCurrentTime(audioData.newAudioTime);
        pauseProgressBar(audioData);
    }
/*
    const changeSongAfterEnd = () => {
        let audio = document.querySelector('audio');
        setCurrentTime(audio.currentTime);
        let tempSongIndex = currentSongIndex+1;
        if (tempSongIndex > playlist.length-1) {
            setCurrentSongIndex(0);
            tempSongIndex = 0;
        } else {
            setCurrentSongIndex(tempSongIndex);
        }
        console.log('log obj' + playlist[tempSongIndex].songName);
        selectNewSong(playlist[tempSongIndex]);
    }
*/
    useEffect(() => {
        fillQueueBar();
        console.log(currentSongIndex);
    }, [currentSongIndex]);

    useEffect(() => {
        document.getElementsByClassName('musicAppContainer')[0].style.display = 'none';
        let audio = document.querySelector('audio');
        audio.addEventListener('ended', () => {
            let newSongIndex = playlist.findIndex(x => (window.location.origin + '/' + x.src) === audio.src);
            console.log(newSongIndex);
            if (newSongIndex >= playlist.length-1) {
                selectNewSong(playlist[0]);
                setCurrentSongIndex(0);
            } else {
                selectNewSong(playlist[newSongIndex+1]);
                setCurrentSongIndex(newSongIndex+1);
            }
            console.log(newSongIndex);
        });
        document.getElementById('miniMusic').classList.remove('miniMusicBox');
        if(window.location.href !== `${window.location.origin}/music`) {
            document.getElementById('miniMusic').className = ('noMiniMusic');
        }
        for (let x=0;x<4;x++) {
            loadPlaylist();
        }
        fillQueueBar();
        audio.volume = .5;
        console.log(window.location.href);
        window.addEventListener('popstate', () => {
            if (window.location.href !== `${window.location.origin}/music`) {
                document.getElementById('miniMusic').className = 'miniMusicBox';
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('img')[0].removeAttribute('id');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].removeAttribute('id');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].removeAttribute('id');
                document.getElementById('closeMiniPlayer').style.display = 'block';
            } else {
                document.getElementById('closeMiniPlayer').style.display = 'none';
                document.getElementsByClassName('musicAppContainer')[0].style.display = 'block';
                document.getElementById('miniMusic').classList.remove('miniMusicBox');
                document.getElementById('miniMusic').classList.remove('noMiniMusic');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('img')[0].setAttribute('id', 'albumArt');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].setAttribute('id', 'songName');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[1].setAttribute('id', 'artistName');
            }
        });
        window.addEventListener('click', () => {
            if (window.location.href !== `${window.location.origin}/music`) {
                document.getElementById('miniMusic').className = 'miniMusicBox';
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('img')[0].removeAttribute('id');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].removeAttribute('id');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].removeAttribute('id');
                document.getElementById('closeMiniPlayer').style.display = 'block';
            } else {
                document.getElementById('closeMiniPlayer').style.display = 'none';
                document.getElementsByClassName('musicAppContainer')[0].style.display = 'block';
                document.getElementById('miniMusic').classList.remove('miniMusicBox');
                document.getElementById('miniMusic').classList.remove('noMiniMusic');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('img')[0].setAttribute('id', 'albumArt');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[0].setAttribute('id', 'songName');
                document.getElementsByClassName('songInfoContainer')[0].getElementsByTagName('div')[1].setAttribute('id', 'artistName');

            }
        });
    }, []);

    return(
        <div>
            <div className='musicAppContainer'>
                <audio id='audioPlayer' preload='auto'></audio>
                <div className='controlsContainer'>
                    <div className='songInfoContainer'>
                        <img onClick={loadPlaylist} src={ playlist[currentSongIndex].img } id='albumArt'></img>
                        <div id='songName'>{ playlist[currentSongIndex].songName }</div>
                        <div id='artistName'>{ playlist[currentSongIndex].artist }</div>
                        <div id='closeMiniPlayer' onClick={closeMiniPlayer}><FontAwesomeIcon icon={faX} /></div>
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
                        <div><FontAwesomeIcon id='playIcon' icon={faHome} /></div>
                    </div>
                    <div id='libraryDeck'></div>
                </div>
                <div className='queueContainer'>
                    <div className='queueTopBar'>
                        <h2 id='queueArtistName'>Artist Corner: { playlist[currentSongIndex].artist }</h2>
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
                        {queueArray}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Music;