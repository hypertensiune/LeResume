import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AppContext } from "@context/ProviderContext";
import useAuth from "@hooks/useAuth";

import { saveResumeToLocalStorage } from "@services/localstorage";
import { getDateFromTimestamp } from "@services/time";

import tmp1 from '@assets/templates/1.png'

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './me.scss'

function ResumeCard({resume, onClick, onDelete, onShare}: {resume: Resume, onClick: Function, onDelete: Function, onShare: Function}) {
  
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
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
          {resume.shared && 
            <span onClick={e => { 
              alert("Views: " + resume.views); 
              e.stopPropagation(); 
            }}>
              <i className="fa-solid fa-eye"></i>
            </span>
          }
          <div style={{"flexGrow": "1"}} onClick={e => {
            e.stopPropagation();
            onShare();
          }}>
            <span><i className="fa-solid fa-share-nodes"></i></span>
          </div>
          <div className="danger" onClick={e => {
            e.stopPropagation();
            setDialogOpen(true);
          }}>
            <span><i className="fa-solid fa-trash"></i></span>
          </div>
        </div>
      </div>
      {dialogOpen &&
        <div className="dialog">
          <div className="wrapper">
            <h1>Delete resume</h1>
            <h2>This resume will be deleted along with all data and views.</h2>
            <h2 className="danger">Warning, action is not reversible!</h2>
            <div>
              <button className="primary" onClick={() => setDialogOpen(false)}>Cancel</button>
              <button 
                className="delete danger"
                onClick={() => {
                  onDelete();
                  setDialogOpen(false);
                }}> 
                  Delete
              </button>
            </div>
          </div>
        </div>
      }
    </>
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
    services.db.deleteResume(services.auth.getUserId(), resume);
    setResumes(resumes.filter(r => r.name != resume.name));
  }

  function onClick(resume: Resume) {
    saveResumeToLocalStorage(resume);
    navigate(`/build?template=${resume.template}&step=basics`);
  }

  function onShare(resume: Resume) {
    if(resume.shared) {
      resume.shared = false;
      services.db.setNonshared(services.auth.getUserId(), resume);
    } else {
      resume.shared = true;
      services.db.setShared(services.auth.getUserId(), resume).then(link => {
        navigator.clipboard.writeText(link);
      });
    }
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logod : logol}/>
      </div>
      <div className='me'>
        <div className="container">
          <div className="header">
            <h1>Your resumes</h1>
            <div className="userActions">
              <button className="primary" onClick={() => navigate('/templates')}>Create resume</button>
            </div>
          </div>
          <div className="subheader">{services.auth.getUserName()}</div>
          <div className="main">
            <div className="resumes">
              {resumes.map(resume => 
                <ResumeCard 
                  resume={resume} 
                  onClick={() => onClick(resume)} 
                  onDelete={() => onDelete(resume)}
                  onShare={() => onShare(resume)}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}