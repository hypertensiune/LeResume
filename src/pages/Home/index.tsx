import { Link } from 'react-router-dom'
import './home.scss'

import initialValue from '../../data/initialValue.ts'

import home from '../../assets/home.png';
import logol from '../../assets/logolight.svg';
import logod from '../../assets/logo.svg';

export default function Home({darkmode}: any) {
  const tid = localStorage.getItem("templateID");
  const step = localStorage.getItem("step");

  let link = "/";
  if (tid != null && step != null) {
    link = `/build?template=${tid}&step=${step}`;
  }

  function newResume() {
    localStorage.removeItem("templateID");
    localStorage.removeItem("step");

    localStorage.setItem("resumeData", JSON.stringify(initialValue));
  }

  return (
    <>
      <div className='home'>
        <div className="wrapper">
          <div className="overlay"></div>
          <div>
            <div className='logo'>
              <img src={darkmode ? logol : logod}/>
            </div>
            <h1>Create a professional resume for free.</h1>
            <div className='buttons'>
              <Link to='/templates' onClick={newResume}>Create new resume</Link>
              <Link to={link}>Continue building</Link>
            </div>
          </div>
          <img src={home}></img>
        </div>
      </div>
    </>
  )
}