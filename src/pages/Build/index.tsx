import { useImmer } from 'use-immer';

import { getResumeFromLocalStorage } from '../../services/localstorage';

import Form from './components/Form';
import Resume from './components/Resume';

import './build.scss';

export default function Build() {

  const [resume, setResume] = useImmer<Resume>(getResumeFromLocalStorage());

  return (
    <>
      <div className='build'>
        <div className='build-container'>
          <Form resume={resume} setResume={setResume}/>
          <Resume resume={resume}/>
        </div>
      </div>
    </>
  )
}