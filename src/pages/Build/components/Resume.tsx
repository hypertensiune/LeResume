import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import useScale from '../../../hooks/useScale';

import * as Templates from '../../../Templates';

const usePrint = (ref: React.MutableRefObject<null>) => useReactToPrint({
  documentTitle: 'resume.pdf',
  content: () => ref.current,
  print: async (printWindow: HTMLIFrameElement) => {
    const printContent = printWindow.contentDocument || printWindow.contentWindow?.document;

    const a4 = printContent?.querySelector('.a4') as HTMLElement;
    a4.style.transform = 'scale(1)';

    printWindow.contentWindow?.print();
  }
});

export default function Resume({
  basics,
  education,
  projects,
  work,
  skills,
  certifications,
}: {
  basics: Details,
  education: Education[],
  projects: Project[],
  work: Work[],
  skills: SkillGroup[],
  certifications: Certification[],
}) {
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
              "1": <Templates.Template1 mref={ref} data={{ basics: basics, education: education, certifications: certifications, work: work, projects: projects, skills: skills }} />,
              "2": <Templates.Template2 mref={ref} data={{ basics: basics, education: education, certifications: certifications, work: work, projects: projects, skills: skills }} />
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