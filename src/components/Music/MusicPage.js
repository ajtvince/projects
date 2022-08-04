import React from 'react';
import './MusicPage.css';
import { faGithub, faReact, faNodeJs, faHtml5, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MusicPage() {
  return(
    <div>
        <div className='musicPageTitle'>
            <div>Music Player&nbsp;&nbsp;&nbsp;<a href='https://github.com/ajtvince/projects'><FontAwesomeIcon icon={faGithub} /></a></div>
            <div id='projectSkills'>
              <FontAwesomeIcon id='skillIcon' icon={faReact} />
              <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
              <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
            </div>
            <p>Listen to some music while browsing the site! The music player will dock at the bottom left if navigating to a different page on this site. - WIP</p>
        </div>
    </div>
  );
}

export default MusicPage;