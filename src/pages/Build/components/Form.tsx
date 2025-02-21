import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext } from '@context/ProviderContext';
import { saveResumeToLocalStorage } from '@services/localstorage';
import { getTimestamp } from '@services/time';

import * as Forms from './forms';

import roadmap from '@assets/roadmap';
import useAuth from '@hooks/useAuth';

const steps = ["basics", "education", "projects", "work", "skills", "certitifications"];

export default function Form({ resume, setResume } : { resume: Resume, setResume: Function }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const step = steps.findIndex(step => step == searchParams.get("step"));

  const services = useContext(AppContext);
  const auth = useAuth(services.auth);

  const saveDataToStorage = () => {
    const time = getTimestamp();

    setResume((draft: Resume) => { 
      draft.created = draft.created == "" ? time : draft.created;
      draft.updated = time;
    });
    
    saveResumeToLocalStorage(resume);

    if(auth) {
      services.db.uploadResume(services.auth.getUserId(), resume);
    }
    
    localStorage.setItem("step", steps[step]);
  }

  const next = () => setSearchParams(prev => {
    prev.set("step", steps[step + 1]);
    return prev;
  });

  const previous = () => setSearchParams(prev => {
    prev.set("step", steps[step - 1]);
    return prev;
  });

  return (
    <div className='form'>
      <div className="container">
        <div className="roadmap">
          <img src={roadmap[step]}></img>
        </div>
        <div className="form-holder">
          {
            {
              0: <Forms.BasicDetails value={resume} setValue={setResume} />,
              1: <Forms.Education value={resume} setValue={setResume} />,
              2: <Forms.Projects github={resume.data.basics.github.split('/')[1]} value={resume} setValue={setResume} />,
              3: <Forms.Work value={resume} setValue={setResume} />,
              4: <Forms.Skills value={resume} setValue={setResume} />,
              5: <Forms.Certifications value={resume} setValue={setResume} />
            }[step]
          }
        </div>
        <div className="buttons" style={{ justifyContent: step == 0 ? 'flex-end' : step == 5 ? 'flex-start' : 'space-between' }}>
          {step > 0 &&
            <button 
              className="secondary" 
              onClick={() => { 
                saveDataToStorage(); 
                previous(); 
              }}>
              <i className="fa-solid fa-chevron-left" style={{ marginRight: '1em' }}></i>
              Previous
            </button>
          }
          {step < 5 &&
            <button 
              className="secondary" 
              onClick={() => { 
                saveDataToStorage(); 
                next(); 
              }} 
              style={{ float: 'right' }}>
              Next
              <i className="fa-solid fa-chevron-right" style={{ marginLeft: '1em' }}></i>
            </button>
          }
        </div>
      </div>
    </div>
  )
}