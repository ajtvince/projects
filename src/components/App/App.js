import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCode, faDatabase, faEnvelope, faLink, faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare, faReact, faCss3Alt, faHtml5, faCss3, faNodeJs, faPhp, faGithub, faGit, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './App.css';
import Music from "../Music/Music";
import { useEffect } from 'react';

export default function App() {


  const openMobileNav = () => {
    let navZ = document.getElementById('navbar');
    let bar1 = document.getElementById('navbarM').getElementsByTagName('div')[0];
    let bar2 = document.getElementById('navbarM').getElementsByTagName('div')[1];
    let bar3 = document.getElementById('navbarM').getElementsByTagName('div')[2];
    let navZIndex = parseInt(navZ.style.zIndex);
    let animTime = {
      duration: 150,
      fill: 'forwards',
    };
    if(navZIndex === -99) {
      navZ.style.zIndex = 99;
      let bar1anim = [
        { transform: 'translateY(0px)', offset: 0 },
        { transform: 'translateY(8px)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(0deg)', offset: 0.6 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: 0.4 },
        { opacity: 1, offset: 0.6 },
        { opacity: 0, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(0px)', offset: 0 },
        { transform: 'translateY(-8px)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(0deg)', offset: 0.6 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    } else {
      navZ.style.zIndex = -99;
      let bar1anim = [
        { transform: 'translateY(8px) rotate(45deg)', offset: 0 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.4 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    }
  }

  const closeMobileNav = () => {
    let navZ = document.getElementById('navbar');
    let navZIndex = parseInt(navZ.style.zIndex);
    let animTime = {
      duration: 150,
      fill: 'forwards',
    };
    if (navZIndex === 99) {
      navZ.style.zIndex = -99;
      let bar1 = document.getElementById('navbarM').getElementsByTagName('div')[0];
      let bar2 = document.getElementById('navbarM').getElementsByTagName('div')[1];
      let bar3 = document.getElementById('navbarM').getElementsByTagName('div')[2];
      let bar1anim = [
        { transform: 'translateY(8px) rotate(45deg)', offset: 0 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.4 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    }
  }

  const handleResize = () => {
    let navZ = document.getElementById('navbar');
    let navZIndex = parseInt(navZ);
    let currentW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let currentWInt = parseInt(currentW);
    if (currentWInt >= 1000 ) {
      navZ.style.removeProperty('z-index');
    } else {
      if (navZIndex !== 99) {
        navZ.style.zIndex = -99;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    let currentW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let currentWInt = parseInt(currentW);
    if (currentWInt < 1000) {
      let navZ = document.getElementById('navbar');
      navZ.style.zIndex = -99;
    }
  }, []);

  return (
    <div>
      <img id='backgroundImg' src='./images/lakemountain.jpg'></img>
      <div id='navbar'>
        <Link onClick={closeMobileNav} to='/'>Home</Link>
        <Link onClick={closeMobileNav} to='/music'>Music Player</Link>
        <Link onClick={closeMobileNav} to='/projects'>Projects</Link>
      </div>
      <div onClick={openMobileNav} id='navbarM'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id='navOther'>
        <a target='_blank' href='https://github.com/ajtvince'><FontAwesomeIcon id='skillIcon' icon={faGithub} /></a>
        <a target='_blank' href='https://www.linkedin.com/in/andrew-vince-841552165/'><FontAwesomeIcon id='skillIcon' icon={faLinkedin} /></a>
        <a target='_blank' href='mailto: ajtvince@gmail.com'><FontAwesomeIcon id='skillIcon' icon={faEnvelope} /></a>
      </div>
      <div id='miniMusic'>
        <Music />
      </div>
    </div>
  );
}