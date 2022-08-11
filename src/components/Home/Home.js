import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCode, faDatabase, faPalette, faPenRuler, faTerminal, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons';
import "./Home.css";
function Home() {

  const showSkills = () => {
    let homeInfo = document.getElementsByClassName('homeInfo')[0];
    let animType = [
      { opacity: 1, offset: 0 },
      { opacity: 0, offset: 1 },
    ];
    let animTime = {
        duration: 400,
        fill: 'forwards',
    }
    homeInfo.animate(animType, animTime);
    document.getElementsByClassName('homeSkillsContainer')[0].style.display = 'block';
    setTimeout(function(){
      homeInfo.className = 'hideHomeInfo';
      let homeSkills = document.getElementsByClassName('homeSkills')[0];
      let animType2 = [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 1 },
      ];
      homeSkills.animate(animType2, animTime);
      for (let x=0; x<9; x++) {
        let currentSkill = homeSkills.getElementsByClassName('skillContainer')[x];
        let tempAnim = [
          { opacity: 0, offset: 0 },
          { opacity: 1, offset: 1 },
        ];
        let tempTimeout = 1000 * (x/10)
        setTimeout(function(){
          currentSkill.animate(tempAnim, animTime);
        }, tempTimeout);
      }
      setTimeout(function(){
        for (let x=0; x<8; x++) {
          let currentSkill = homeSkills.getElementsByClassName('skillContainer')[x].getElementsByTagName('div')[1];
          let tempAnim = [
            { width: '0px', offset: 0 },
            { width: '70%', offset: 1 },
          ];
          if (x >= 3) {
            tempAnim = [
              { width: '0px', offset: 0 },
              { width: '60%', offset: 1 },
            ];
          }
          if (x >= 6) {
            tempAnim = [
              { width: '0px', offset: 0 },
              { width: '40%', offset: 1 },
            ];
          }
          let tempTimeout = 800 * (x/20)
          setTimeout(function(){
            currentSkill.animate(tempAnim, animTime);
          }, tempTimeout);
        }
      }, 400);
    }, 400);
  }

  useEffect(() => {
    console.log('ran at beginning');
    document.getElementsByClassName('homeSkillsContainer')[0].style.display = 'none';
  }, []);

  return(
    <div className='homeContainer'>
      <div className='homeOverview'>
        <div className='homeInfo'>
          <div>Andrew Vince</div>
          <div>Front End Developer</div>
          <img src='./images/hike.jpg'></img>
          <button onClick={showSkills}>Skills <FontAwesomeIcon id='skillIcon' icon={faArrowRight} /></button>
        </div>
        <div className='homeSkillsContainer'>
          <div className='homeSkills'>
            <div>Top Skills</div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faJsSquare} /><span>JavaScript</span></div><div id='skillProgress'>Advanced</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faCode} /><span>HTML</span></div><div id='skillProgress'>Advanced</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faPenRuler} /><span>CSS</span></div><div id='skillProgress'>Advanced</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faReact} /><span>React</span></div><div id='skillProgress'>Intermediate</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faPalette} /><span>Design</span></div><div id='skillProgress'>Intermediate</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faTerminal} /><span>PowerShell</span></div><div id='skillProgress'>Intermediate</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faDatabase} /><span>SQL</span></div><div id='skillProgress'>Beginner</div></div>
            <div className='skillContainer'><div><FontAwesomeIcon id='skillIcon' icon={faUpRightAndDownLeftFromCenter} /><span>APIs</span></div><div id='skillProgress'>Beginner</div></div>
            <div className='skillContainer'><Link to='/projects'><button id='toProjectsButton'>Projects  <FontAwesomeIcon id='skillIcon' icon={faArrowRight} /></button></Link></div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;