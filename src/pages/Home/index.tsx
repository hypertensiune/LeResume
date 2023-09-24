import { Link } from 'react-router-dom'
import './home.scss'

import home from '../../assets/home.png';

import initialValue from '../../data/initialValue.ts'

export default function Home() {
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
            <h1>Create a professional resume for free.</h1>
            <h2>Built for devs. No account required.</h2>
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