import { useState } from 'react';
import { Button, Input } from './common'

function SkillInput({ index, value, setValue, del }: { index: number, value: SkillGroup, setValue: Function, del: Function }) {

  return (
    <>
      <div className="form2">
        <div className="row">
          <Input type="text"
            label="Skill Group"
            placeholder="Hard Skills"
            value={value.type}
            onChange={(e: any) => setValue((draft: SkillGroup[]) => { draft[index].type = e.target.value })}
            required
          />
          <Input type="text"
            label="Skills"
            value={value.skills}
            onChange={(e: any) => setValue((draft: SkillGroup[]) => { draft[index].skills = e.target.value })}
          />
        </div>
        <div className="row">
          <Button text="Delete" del onClick={del} />
        </div>
      </div>
    </>
  )
}

export default function Skills({ value, setValue }: { value: SkillGroup[], setValue: Function }) {
  const [id, setId] = useState(1);

  function removeSkill(id: number) {
    setValue((draft: SkillGroup[]) => draft.filter(el => el.id != id))
  }

  function addSkill() {
    setValue((draft: SkillGroup[]) => { draft.push({ id: id, type: '', skills: '' }) });
    setId(id + 1);
  }

  return (
    <>
      <form>
        <div className="row notcolumn">
          <h2><i className="fa-solid fa-gear"></i> Skills</h2>
          <Button icon="fa-solid fa-plus" onClick={addSkill} />
        </div>
        <div className="column">
          {value.map((e, i) => <SkillInput key={i} value={e} index={i} setValue={setValue} del={() => removeSkill(e.id)} />)}
        </div>
      </form>
    </>
  )
}