import { useState } from 'react'
import { useImmer } from 'use-immer';

import { getResumeFromLocalStorage } from '../../services/localstorage';

import Form from './components/Form';
import Resume from './components/Resume';

import './build.scss';

export default function Build() {

  const [resume, _] = useState<Resume>(getResumeFromLocalStorage());

  const [basics, setBasics] = useImmer(resume.data.basics);
  const [education, setEducation] = useImmer(resume.data.education);
  const [projects, setProjects] = useImmer(resume.data.projects);
  const [work, setWork] = useImmer(resume.data.work);
  const [skills, setSkills] = useImmer(resume.data.skills);
  const [certifications, setCertifications] = useImmer(resume.data.certifications);

  return (
    <>
      <div className='build'>
        <div className='build-container'>
          <Form
            basics={basics} setBasics={setBasics}
            education={education} setEducation={setEducation}
            projects={projects} setProjects={setProjects}
            work={work} setWork={setWork}
            skills={skills} setSkills={setSkills}
            certifications={certifications} setCertifications={setCertifications}
          />
          <Resume
            basics={basics}
            education={education}
            projects={projects}
            work={work}
            skills={skills}
            certifications={certifications}
          />
        </div>
      </div>
    </>
  )
}