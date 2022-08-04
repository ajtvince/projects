import { useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCode, faDatabase, faLink, faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare, faReact, faCss3Alt, faHtml5, faCss3, faNodeJs, faPhp, faGithub, faGit } from '@fortawesome/free-brands-svg-icons';
import "./Projects.css";

function Projects() {
  return(
    <div className='projectsContainer'>
      <div className='projectContainer'>
        <div id='projectName'>JRayl Website Redesign&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://jrayl.com/'><FontAwesomeIcon id='skillIcon' icon={faArrowUpRightFromSquare} /></a></div>
        <div id='projectSkills'>
          <FontAwesomeIcon id='skillIcon' icon={faJsSquare} />
          <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
          <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
          <FontAwesomeIcon id='skillIcon' icon={faPhp} />
        </div>
        <img id='projectImg' src='./images/jrayl-desktop.png' alt='img'></img>
        <div id='projectDesc'>This was my first experience working on a professional website for a company. Although I was towards the beginning of my degree when I started and finished this project, it was still a huge learning experience for me in regards to building a complete static website and working with a marketing team. I used HTML, CSS, JavaScript, and PHP on this project alongside JavaScript libraries when additional functionality is needed.</div>
      </div>
      <div className='projectContainer'>
        <div id='projectName'>Online Store (MERN)&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://github.com/ajtvince/senior-project'><FontAwesomeIcon id='skillIcon' icon={faGithub} /></a></div>
        <div id='projectSkills'>
          <FontAwesomeIcon id='skillIcon' icon={faReact} />
          <FontAwesomeIcon id='skillIcon' icon={faNodeJs} />
          <FontAwesomeIcon id='skillIcon' icon={faDatabase} />
          <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
          <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
        </div>
        <img id='projectImg' src='./images/inthome.png' alt='img'></img>
        <div id='projectDesc'>This was a school project I created to learn more about full-stack development using the MERN (MongoDB, Express.js, ReactJS, Node.js) Stack. This project was focused mainly on the back-end and connecting that to databases (MongoDB), sending and retrieving data, and connecting the back-end and front-end together. Although this project does not include any type of encryption or data validation aside from a very basic login system, it was a great introduction to back-end development for me.</div>
      </div>
      <div className='projectContainer'>
        <div id='projectName'>Custom Audio Player&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://github.com/ajtvince/projects'><FontAwesomeIcon id='skillIcon' icon={faGithub} /></a></div>
        <div id='projectSkills'>
          <FontAwesomeIcon id='skillIcon' icon={faReact} />
          <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
          <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
        </div>
        <img id='projectImg' src='./images/audo.png' alt='img'></img>
        <div id='projectDesc'>WIP - Exploration into the HTMLMediaElement and to improve React skills. Customized the controls and added a song library and additional functionality. No additional libraries/frameworks used other than React.</div>
      </div>
      <div className='projectContainer'>
        <div id='projectName'>whotoban.gg&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://github.com/ajtvince/WhoToBan-LoL-Match-Analysis'><FontAwesomeIcon id='skillIcon' icon={faGithub} /></a></div>
        <div id='projectSkills'>
          <FontAwesomeIcon id='skillIcon' icon={faReact} />
          <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
          <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
        </div>
        <img id='projectImg' src='./images/whotoban2.png' alt='img'></img>
        <div id='projectDesc'>League of Legends application telling players who to ban based off of who they win or lose against the most. Learned about using APIs, state, data management, and more.</div>
      </div>
      <div className='projectContainer'>
        <div id='projectName'>TFT Buddy&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://github.com/ajtvince/tftbuddy'><FontAwesomeIcon id='skillIcon' icon={faGithub} /></a></div>
        <div id='projectSkills'>
          <FontAwesomeIcon id='skillIcon' icon={faReact} />
          <FontAwesomeIcon id='skillIcon' icon={faHtml5} />
          <FontAwesomeIcon id='skillIcon' icon={faCss3Alt} />
        </div>
        <img id='projectImg' src='./images/tftbuddy.png' alt='img'></img>
        <div id='projectDesc'>This was a personal project that I used to explore the React framework. I started this project when a new game mode in a game I have played was first released, called Teamfight Tactics. This project allowed you to add and remove different champions and items to your team that will then show the synergies between them. You could also search the username of the player to see their match history. This project was put on hold due to the lack on an API for the game at the time. I used HTML, CSS, JavaScript, and ReactJS on this project.</div>
      </div>
    </div>
  );

}

export default Projects;