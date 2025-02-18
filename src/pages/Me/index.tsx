import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import tmp1 from '../../assets/templates/1.png'

import logod from '../../assets/logo.svg';
import logol from '../../assets/logolight.svg';

import './me.scss'
import { useContext } from "react";
import { AppContext } from "../../context/ProviderContext";
import useAuth from "../../hooks/useAuth";

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
              <Link to="/">Create resume</Link>
            </div>
          </div>
          <div className="main">
            <div className="resumes">
              {
                resumes.map(resume => {
                  return (
                    <div className="resumeCard">
                      <img src={tmp1}/>
                      <div className="details">
                        <div>
                          <span style={{"color": "var(--resume-card-text-primary)"}}>{resume.name}</span>
                          <span>Template #1</span>
                        </div>
                        <div>
                          <span style={{"fontSize": "0.8rem"}}>Created {resume.created}</span>
                          <span style={{"fontSize": "0.8rem"}}>Edited {resume.updated}</span>
                        </div>
                      </div>
                      <div className="actions">
                        <span><i className="fa-solid fa-download"></i></span>
                        <div style={{"flexGrow": "1"}}>
                          <span><i className="fa-solid fa-share-nodes"></i></span>
                        </div>
                        <div className="danger">
                          <span><i className="fa-solid fa-trash"></i></span>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}