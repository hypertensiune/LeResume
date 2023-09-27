import { useSearchParams } from 'react-router-dom';

import * as Forms from './forms';

import roadmap from '../../../assets/roadmap';

const steps = ["basics", "education", "projects", "work", "skills", "certitifications"];

export default function Form({
  basics,
  setBasics,
  education,
  setEducation,
  projects,
  setProjects,
  work,
  setWork,
  skills,
  setSkills,
  certifications,
  setCertifications
}: {
  basics: Details,
  setBasics: Function,
  education: Education[],
  setEducation: Function,
  projects: Project[],
  setProjects: Function,
  work: Work[],
  setWork: Function,
  skills: SkillGroup[],
  setSkills: Function,
  certifications: Certification[],
  setCertifications: Function
}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const step = steps.findIndex(step => step == searchParams.get("step"));

  const saveDataToStorage = () => {
    localStorage.setItem("resumeData", JSON.stringify({
      basics: basics,
      education: education,
      projects: projects,
      work: work,
      skills: skills,
      certifications: certifications
    }));

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
              0: <Forms.BasicDetails value={basics} setValue={setBasics} />,
              1: <Forms.Education value={education} setValue={setEducation} />,
              2: <Forms.Projects github={basics.github.split('/')[1]} value={projects} setValue={setProjects} />,
              3: <Forms.Work value={work} setValue={setWork} />,
              4: <Forms.Skills value={skills} setValue={setSkills} />,
              5: <Forms.Certifications value={certifications} setValue={setCertifications} />
            }[step]
          }
        </div>
        <div className="buttons" style={{ justifyContent: step == 0 ? 'flex-end' : step == 5 ? 'flex-start' : 'space-between' }}>
          {step > 0 &&
            <div className="button" onClick={() => { saveDataToStorage(); previous(); }}>
              <i className="fa-solid fa-chevron-left" style={{ marginRight: '1em' }}></i>
              Previous
            </div>
          }
          {step < 5 &&
            <div className="button" onClick={() => { saveDataToStorage(); next(); }} style={{ float: 'right' }}>
              Next
              <i className="fa-solid fa-chevron-right" style={{ marginLeft: '1em' }}></i>
            </div>
          }
        </div>
      </div>
    </div>
  )
}