import { Link, useNavigate } from 'react-router-dom'

import { clearLocalStorage, saveResumeToLocalStorage } from '@services/localstorage';
import { getTimestamp } from '@services/time';

import emptyResume from '@data/emptyResume';

import temp1 from '@assets/templates/1.png';
import temp2 from '@assets/templates/2.png';

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './card.scss'
import './templates.scss'

function Template({ src, to, ...props }: any) {
  return (
    <>
      <div className="template-card" {...props}>
        <div className='overlay'></div>
        <img src={src} />
        <Link to={to}>Use this template</Link>
      </div>
    </>
  )
}

export default function ChooseTemplate({darkmode}: any) {

  const navigate = useNavigate();

  function prepareForNewBuild(templateID: number) {
    clearLocalStorage();
    
    const resume = {...emptyResume};
    resume.name = "New Resume";
    resume.template = templateID;
    resume.created = getTimestamp();

    saveResumeToLocalStorage(resume);
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logod : logol}/>
      </div>
      <div className='templates'>
        <div className="wrapper">
          <h1>Choose a template</h1>
          <div className='container'>
            <Template src={temp1} to="/build?template=1&step=basics" onClick={() => prepareForNewBuild(1)}></Template>
            <Template src={temp2} to="/build?template=2&step=basics" onClick={() => prepareForNewBuild(2)}></Template>
          </div>
        </div>
      </div>
    </>
  )
}