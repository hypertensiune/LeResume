import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { AppContext } from '@context/ProviderContext';

import { clearLocalStorage, saveResumeToLocalStorage } from '@services/localstorage';
import { getTimestamp } from '@services/time';

import emptyResume from '@data/emptyResume';

import temp1 from '@assets/templates/1.png';
import temp2 from '@assets/templates/2.png';

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './choosetemplate.scss';

function Template({ src, onClick, ...props }: any) {
  return (
    <>
      <div className="template-card" {...props}>
        <div className='overlay'></div>
        <img src={src} />
        <button className='primary' onClick={onClick}>Use this template</button>
      </div>
    </>
  )
}

export default function ChooseTemplate({darkmode}: any) {

  const navigate = useNavigate();
  const services = useContext(AppContext);

  async function prepareForNewBuild(templateID: number) {
    clearLocalStorage();
    
    const resume = {...emptyResume};
    const id = await services.db.getMetadata(services.auth.getUserId(), 'increment');
    services.db.setMetadata(services.auth.getUserId(), 'increment', parseInt(id) + 1);

    resume.id = id;
    resume.name = `Resume #${id}`;
    resume.template = templateID;
    resume.created = getTimestamp();

    saveResumeToLocalStorage(resume);
  }

  async function onTemplateClick(templateID: number) {
    await prepareForNewBuild(templateID);
    const link = `/build?template=${templateID}&step=basics`

    navigate(link);
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logol : logod}/>
      </div>
      <div className='templates'>
        <h1>Choose a template</h1>
        <div className='container'>
          <Template src={temp1} onClick={() => onTemplateClick(1)}></Template>
          <Template src={temp2} onClick={() => onTemplateClick(2)}></Template>
          <Template src={temp2} onClick={() => {}}></Template>
          <Template src={temp2} onClick={() => {}}></Template>
        </div>
      </div>
    </>
  )
}