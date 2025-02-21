import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom';

import usePrint from '@hooks/usePrint';
import useScale from '@hooks/useScale';

import * as Templates from '@templates/index';

export default function Resume({resume, initialScale, ratio}: {resume: Resume, initialScale: number, ratio: number}) {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get("template")!;

  const scale = useScale(initialScale, ratio);

  const ref = useRef(null);
  const handlePrint = usePrint(ref);

  // function collapse() {
  //   const rh = document.querySelector(".resume-holder") as HTMLElement
  //   rh.classList.toggle("collapsed");
  // }

  return (
    // <div className={window.innerWidth < 680 ? "resume-holder collapsed" : "resume-holder"}>
    <div className="resume-holder">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 
              21cm = 793.7px
              29.7cm = 1122.52px
        */}
        <div className='resume-preview' style={{ width: 793.7 * scale, height: 1122.52 * scale }}>
          {
            {
              "1": <Templates.Template1 mref={ref} scale={scale} data={resume.data} />,
              "2": <Templates.Template2 mref={ref} scale={scale} data={resume.data} />
            }[tid]
          }
        </div>
        <div className="buttons">
          <button className="secondary" style={{ float: 'right' }} onClick={() => { handlePrint(); }}><i className="fa-solid fa-download"></i> Download</button>
        </div>
      </div>
      {/* <div id="collapse" className="collapse" onClick={collapse}>
        <i className="fa-solid fa-eye-slash"></i>
        <i className="fa-solid fa-eye"></i>
      </div> */}
    </div>
  )
}