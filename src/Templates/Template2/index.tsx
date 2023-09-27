import { Col, Header, IconText, Line, Main, Resume, SectionL, Work, Text, EducationL, Project, IconLink } from '../components.tsx';
import './t2.scss'

export default function Template2({ mref, data }: { mref: any, data: ResumeData }) {
  return (
    <>
      <Resume id='t2' mref={mref}>
        <Header name={data.basics.firstname + ' ' + data.basics.lastname} title={data.basics.jobtitle} />
        <Main>
          <Col width='35%' className='left'>
            <SectionL name='Contact'>
              {data.basics.phone && <IconText icon='fa-solid fa-phone' text={data.basics.phone} />}
              {data.basics.email && <IconText icon='fa-solid fa-envelope' text={data.basics.email} />}
              {data.basics.github && <IconLink icon='fa-brands fa-github' text={data.basics.github} link={"https://" + data.basics.github} />}
              {data.basics.linkedin && <IconLink icon='fa-brands fa-linkedin' text={data.basics.linkedin} link={"https://" + data.basics.linkedin} />}
              {data.basics.website && <IconLink icon='fa-solid fa-link' text={data.basics.website} link={"https://" + data.basics.website} />}
              {data.basics.location && <IconText icon='fa-solid fa-location-dot' text={data.basics.location} />}
            </SectionL>
            {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
              <>
                <Line />
                <SectionL name='Skills'>
                  {data.skills.map(s => <Text key={s.id}>{s.skills}</Text>)}
                </SectionL>
              </>
            }
            {data.education.length > 0 && data.education[0].institution &&
              <>
                <Line />
                <SectionL name='Education' spaced>
                  {data.education.map((edu: Education) => <EducationL key={edu.id} education={edu} />)}
                </SectionL>
              </>
            }
            {data.certifications.length > 0 && data.certifications[0].issuer &&
              <>
                <Line />
                <SectionL name='Certifications'>
                  {data.certifications.map((edu: any) => <EducationL key={edu.id} education={edu} />)}
                </SectionL>
              </>
            }
          </Col>
          <Col width='65%' className='right'>
            {data.projects.length > 0 && data.projects[0].name &&
              <SectionL name='Projects'>
                {data.projects.map(project => <Project key={project.id} project={project} />)}
              </SectionL>
            }
            {data.work.length > 0 && data.work[0].position &&
              <SectionL name='Experience'>
                {data.work.map(w => <Work key={w.id} work={w} />)}
              </SectionL>
            }
          </Col>
        </Main>
      </Resume>
    </>
  )
}
