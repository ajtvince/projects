import { useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare, faReact, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import "./Home.css";
function Home() {



  return(
    <div className='homeContainer'>
      <div className='homeOverview'>
        <div>Andrew Vince</div>
        <div>Front End Developer</div>
        <img src='./images/hike.jpg'></img>
        <div className='homeSkills'>
          <div>Top Skills</div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faJsSquare} /><span>JavaScript</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faReact} /><span>React</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faCode} /><span>HTML</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faPenRuler} /><span>CSS</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faJsSquare} /><span>JavaScript</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faReact} /><span>React</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faCode} /><span>HTML</span></div>
          <div className='skillContainer'><FontAwesomeIcon id='skillIcon' icon={faPenRuler} /><span>CSS</span></div>
        </div>
      </div>
    </div>
  );

}

export default Home;