import React from 'react';
import './MusicPage.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MusicPage() {
  return(
    <div>
        <div className='musicPageTitle'>
            <div>Music Player&nbsp;&nbsp;&nbsp;<a href='https://github.com/ajtvince/projects'><FontAwesomeIcon icon={faGithub} /></a></div>
            <p>WIP - Project to learn about working with the HTMLMediaElement and to further improve React skills.</p>
        </div>
    </div>
  );
}

export default MusicPage;