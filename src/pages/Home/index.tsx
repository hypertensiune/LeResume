import { useNavigate } from 'react-router-dom'
import { getResumeFromLocalStorage } from '@services/localstorage';

import home from '@assets/home.png';
import logol from '@assets/logolight.svg';
import logod from '@assets/logo.svg';

import './home.scss'

export default function Home({darkmode}: any) {
  
  const {template} = getResumeFromLocalStorage();
  const continueLink = template ? `/build?template=${template}&step=basics` : '/';

  const navigate = useNavigate();
  
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
              <button className='primary' onClick={() => navigate('/templates')}>Create new resume</button>
              <button className='primary' onClick={() => navigate(continueLink)}>Continue building</button>
            </div>
          </div>
          <img src={home}></img>
        </div>
      </div>
    </>
  )
}