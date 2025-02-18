import { Input } from './common'

export default function BasicDetails({ value, setValue }: { value: Resume, setValue: Function }) {
  return (
    <>
      <div className="row">
        <h2><i className="fa-solid fa-user"></i> Basic Details</h2>
      </div>
      <form>
        <div className="row">
          <Input type='text'
            label='First Name'
            placeholder="John"
            value={value.data.basics.firstname}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.firstname = e.target.value })}
            required
          />
          <Input type="text"
            label="Last Name"
            placeholder="Doe"
            value={value.data.basics.lastname}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.lastname = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input type="text"
            label="Job title"
            placeholder="Software Engineer"
            value={value.data.basics.jobtitle}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.jobtitle = e.target.value })}
          />
          <Input type="text"
            label="Location"
            placeholder="City, Country"
            value={value.data.basics.location}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.location = e.target.value })}
            icon="fa-solid fa-location-dot"
          />
        </div>
        <div className="row">
          <Input type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            value={value.data.basics.email}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.email = e.target.value })}
            icon="fa-solid fa-envelope"
            required
          />
          <Input type="tel"
            label="Phone Number"
            placeholder="(+41) 741 123 311"
            value={value.data.basics.phone}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.phone = e.target.value })}
            icon="fa-solid fa-phone"
            required
          />
        </div>
        <br /><br />
        <div className="row">
          <Input type="text"
            label="Website"
            placeholder="website.com"
            value={value.data.basics.website}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.website = e.target.value })}
            icon="fa-solid fa-link"
          />
        </div>
        <div className="row">
          <Input type="text"
            label="Github"
            placeholder="github.com/johndoe"
            value={value.data.basics.github}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.github = e.target.value })}
            icon="fa-brands fa-github"
          />
          <Input type="text"
            label="LinkedIn"
            placeholder="linkedin.com/in/johndoe"
            value={value.data.basics.linkedin}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.basics.linkedin = e.target.value })}
            icon="fa-brands fa-linkedin"
          />
        </div>
      </form >
    </>
  )
}