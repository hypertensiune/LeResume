import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom';

import usePrint from '../../../hooks/usePrint';
import useScale from '../../../hooks/useScale';

import * as Templates from '../../../Templates';

export default function Resume({resume}: {resume: Resume}) {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get("template")!;

  const scale = useScale();

  const ref = useRef(null);
  const handlePrint = usePrint(ref);

  function collapse() {
    const rh = document.querySelector(".resume-holder") as HTMLElement
    rh.classList.toggle("collapsed");
  }

  return (
    <div className={window.innerWidth < 680 ? "resume-holder collapsed" : "resume-holder"}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 
              21cm = 793.7px
              29.7cm = 1122.52px
        */}
        <div className='resume-preview' style={{ width: 793.7 * scale, height: 1122.52 * scale }}>
          {
            {
              "1": <Templates.Template1 mref={ref} data={resume.data} />,
              "2": <Templates.Template2 mref={ref} data={resume.data} />
            }[tid]
          }
        </div>
        <div className="buttons">
          <div className="button" style={{ float: 'right' }} onClick={() => { handlePrint(); }}><i className="fa-solid fa-download"></i> Download</div>
        </div>
      </div>
      <div id="collapse" className="collapse" onClick={collapse}>
        <i className="fa-solid fa-eye-slash"></i>
        <i className="fa-solid fa-eye"></i>
      </div>
    </div>
  )
}