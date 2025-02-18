import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AppContext } from "@context/ProviderContext";
import useAuth from "@hooks/useAuth";

import { saveResumeToLocalStorage } from "@services/localstorage";
import { getDateFromTimestamp } from "@services/time";

import tmp1 from '@assets/templates/1.png'

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './me.scss'

function ResumeCard({resume, onClick, onDelete}: {resume: Resume, onClick: Function, onDelete: Function}) {
  return (
    <div className="resumeCard" onClick={() => onClick()}>
      <img src={tmp1}/>
      <div className="details">
        <div>
          <span style={{"color": "var(--resume-card-text-primary)"}}>{resume.name}</span>
          <span>Template #1</span>
        </div>
        <div>
          <span style={{"fontSize": "0.8rem"}}>Created {getDateFromTimestamp(resume.created)}</span>
          <span style={{"fontSize": "0.8rem"}}>Edited {getDateFromTimestamp(resume.updated)}</span>
        </div>
      </div>
      <div className="actions">
        <span><i className="fa-solid fa-download"></i></span>
        <div style={{"flexGrow": "1"}}>
          <span><i className="fa-solid fa-share-nodes"></i></span>
        </div>
        <div className="danger" onClick={e => {
          e.stopPropagation();
          onDelete();
        }}>
          <span><i className="fa-solid fa-trash"></i></span>
        </div>
      </div>
    </div>
  )
}

export default function Me({darkmode}: any) {

  const navigate = useNavigate();
  const services = useContext(AppContext);

  const [resumes, setResumes] = useState<Resume[]>([]);

  const isAuthenticated = useAuth(services.auth);

  useEffect(() => {
    if(isAuthenticated == false) {
      navigate('/signin');
      return;
    }

    if(isAuthenticated == true) {
      services.db.getResumes(services.auth.getUserId()).then(data => {
        setResumes(data);
      });
    }
  }, [isAuthenticated]);

  function onDelete(resume: Resume) {
    if(confirm("Are you sure you want to delete this resume?")) {
      services.db.deleteResume(services.auth.getUserId(), resume);
      setResumes(resumes.filter(r => r.name != resume.name));
    }
  }

  function onClick(resume: Resume) {
    saveResumeToLocalStorage(resume);
    navigate(`/build?template=${resume.template}&step=basics`);
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logod : logol}/>
      </div>
      <div className='me'>
        <div className="container">
          <div className="header">
            <h1>Welcome, User</h1>
            <div className="userActions">
              <Link to="/"><i className="fa-solid fa-pen"></i></Link>
              <Link to="/templates">Create resume</Link>
            </div>
          </div>
          <div className="main">
            <div className="resumes">
              {resumes.map(resume => <ResumeCard resume={resume} onClick={() => onClick(resume)} onDelete={() => onDelete(resume)}></ResumeCard>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}