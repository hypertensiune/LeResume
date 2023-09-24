import { useState } from 'react'

import { useImmer } from 'use-immer';

import Form from './components/Form';
import Resume from './components/Resume';

import './build.scss';

export default function Build() {

  const [initialValue, _] = useState<ResumeData>(JSON.parse(localStorage.getItem("resumeData") || ""));

  const [basics, setBasics] = useImmer(initialValue.basics);
  const [education, setEducation] = useImmer(initialValue.education);
  const [projects, setProjects] = useImmer(initialValue.projects);
  const [work, setWork] = useImmer(initialValue.work);
  const [skills, setSkills] = useImmer(initialValue.skills);
  const [certifications, setCertifications] = useImmer(initialValue.certifications);

  console.log(projects);

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