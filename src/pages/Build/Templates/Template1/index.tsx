import { Col, EducationI, Header, IconText, Line, Main, Project, Resume, SectionI, SectionL, Text, Work, IconLink } from '../Components.tsx';
import './t1.scss';

const Template1 = ({ mref, data }: { mref: any, data: ResumeData }) => {
  return (
    <>
      <Resume id='t1' mref={mref}>
        <Header name={data.basics.firstname + " " + data.basics.lastname}>
          <SectionI>
            {data.basics.phone && <IconText icon='fa-solid fa-phone' text={data.basics.phone} />}
            {data.basics.email && <IconText icon='fa-solid fa-envelope' text={data.basics.email} />}
            {data.basics.github && <IconLink icon='fa-brands fa-github' text={data.basics.github} link={"https://" + data.basics.github} />}
            {data.basics.location && <IconText icon='fa-solid fa-location-dot' text={data.basics.location} />}
          </SectionI>
        </Header>
        <Line />
        <Main>
          <Col width='100%'>
            {data.projects.length > 0 && data.projects[0].name &&
              <SectionL name='Projects'>
                {data.projects.map(project => <Project project={project} />)}
              </SectionL>
            }
            {data.work.length > 0 && data.work[0].position &&
              <SectionL name='Experience'>
                {data.work.map(w => <Work work={w} />)}
              </SectionL>
            }
            {data.education.length > 0 && data.education[0].institution &&
              <SectionL name='Education' spaced>
                {data.education.map((edu: Education) => <EducationI education={edu} />)}
              </SectionL>
            }
            {/* <SectionL name='Skils & Certifications'>
              {data.skills.length > 0 && data.skills[0].skills.size > 0 &&
                <SectionL name='Skills' subsection>
                  {data.skills.map(s => <Text>{[...s.skills].join(', ')}</Text>)}
                </SectionL>
              }
              <SectionL name='Skils' subsection>
                <SectionL>
                  <Text>C++, Kotlin, Typescript</Text>
                  <Text>Android, React, Teamwork, Planning, Management</Text>
                </SectionL>
              </SectionL>
              <SectionL name='Certs' subsection>
                {certification.map(edu =>
                  <EducationI insitution={edu.issuer} degree={edu.name} year={edu.date} />
                )}
              </SectionL>
            </SectionL> */}
            {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
              <SectionL name='Skills'>
                {data.skills.map(s => <Text>{[...s.skills].join(', ')}</Text>)}
              </SectionL>
            }
            {data.certifications.length > 0 && data.certifications[0].issuer &&
              <>
                <SectionL name='Certifications'>
                  {data.certifications.map((edu: any) => <EducationI education={edu} />)}
                </SectionL>
              </>
            }
          </Col>
        </Main>
      </Resume>
    </>
  )
}

export default Template1;