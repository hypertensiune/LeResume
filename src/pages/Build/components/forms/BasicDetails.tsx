import { Input } from './common'

export default function BasicDetails({ value, setValue }: { value: Details, setValue: Function }) {
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
            value={value.firstname}
            onChange={(e: any) => setValue((draft: Details) => { draft.firstname = e.target.value })}
            required
          />
          <Input type="text"
            label="Last Name"
            placeholder="Doe"
            value={value.lastname}
            onChange={(e: any) => setValue((draft: Details) => { draft.lastname = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input type="text"
            label="Job title"
            placeholder="Software Engineer"
            value={value.jobtitle}
            onChange={(e: any) => setValue((draft: Details) => { draft.jobtitle = e.target.value })}
          />
          <Input type="text"
            label="Location"
            placeholder="City, Country"
            value={value.location}
            onChange={(e: any) => setValue((draft: Details) => { draft.location = e.target.value })}
            icon="fa-solid fa-location-dot"
          />
        </div>
        <div className="row">
          <Input type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            value={value.email}
            onChange={(e: any) => setValue((draft: Details) => { draft.email = e.target.value })}
            icon="fa-solid fa-envelope"
            required
          />
          <Input type="tel"
            label="Phone Number"
            placeholder="(+41) 741 123 311"
            value={value.phone}
            onChange={(e: any) => setValue((draft: Details) => { draft.phone = e.target.value })}
            icon="fa-solid fa-phone"
            required
          />
        </div>
        <br /><br />
        <div className="row">
          <Input type="text"
            label="Website"
            placeholder="website.com"
            value={value.website}
            onChange={(e: any) => setValue((draft: Details) => { draft.website = e.target.value })}
            icon="fa-solid fa-link"
          />
        </div>
        <div className="row">
          <Input type="text"
            label="Github"
            placeholder="github.com/johndoe"
            value={value.github}
            onChange={(e: any) => setValue((draft: Details) => { draft.github = e.target.value })}
            icon="fa-brands fa-github"
          />
          <Input type="text"
            label="LinkedIn"
            placeholder="linkedin.com/in/johndoe"
            value={value.linkedin}
            onChange={(e: any) => setValue((draft: Details) => { draft.linkedin = e.target.value })}
            icon="fa-brands fa-linkedin"
          />
        </div>
      </form >
    </>
  )
}