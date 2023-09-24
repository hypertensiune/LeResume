import { useState } from 'react'

import { Button, Input } from './common'

function CertificationInput({ index, value, setValue, del }: { index: number, value: Certification, setValue: Function, del: Function }) {
  return (
    <>
      <div className="form2">
        <div className="row">
          <Input type="text"
            label="Issuer"
            placeholder="Cisco Certifications"
            value={value.issuer}
            onChange={(e: any) => setValue((draft: Certification[]) => { draft[index].issuer = e.target.value })}
            required
          />
          <Input type="text"
            label="Name"
            placeholder="CCNA Security"
            value={value.name}
            onChange={(e: any) => setValue((draft: Certification[]) => { draft[index].name = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input
            type="month"
            label="Date"
            value={value.date}
            onChange={(e: any) => setValue((draft: Certification[]) => { draft[index].date = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Button text="Delete" del onClick={del} />
        </div>
      </div>
    </>
  )
}

export default function Certifications({ value, setValue }: { value: Certification[], setValue: Function }) {
  const [id, setId] = useState(1);

  function removeCertification(id: number) {
    setValue((draft: Certification[]) => draft.filter(el => el.id != id));
  }

  function addCertification() {
    setValue((draft: Certification[]) => { draft.push({ id: id, issuer: "", name: "", date: "" }) });
    setId(id + 1);
  }

  return (
    <>
      <form>
        <div className="row">
          <h2><i className="fa-solid fa-file-circle-check"></i> Certifications</h2>
          <Button icon="fa-solid fa-plus" onClick={addCertification} />
        </div>
        <div className="column">
          {value.map((e, i) => <CertificationInput key={i} value={e} index={i} setValue={setValue} del={() => removeCertification(e.id)} />)}
        </div>
      </form>
    </>
  )
}