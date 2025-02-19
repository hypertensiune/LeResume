const emptyResume: Resume = {
  id: 0,
  shared: false,
  views: 0,
  name: "",
  template: 0,
  created: "",
  updated: "",
  data: {
    basics: {
      firstname: '',
      lastname: '',
      jobtitle: '',
      phone: '',
      email: '',
      location: '',
      github: '',
      linkedin: '',
      website: ''
    },
    education: [
      {
        id: 0,
        institution: '',
        end: '',
        start: '',
        degree: ''
      }
    ],
    projects: [
      {
        id: 0,
        name: '',
        description: [],
        languages: [],
        github: '',
        website: ''
      }
    ],
    certifications: [
      {
        id: 0,
        name: '',
        issuer: '',
        date: ''
      }
    ],
    work: [
      {
        id: 0,
        position: '',
        company: '',
        location: '',
        start: '',
        end: '',
        description: []
      }
    ],
    skills: [
      {
        id: 0,
        type: '',
        skills: ""
      }
    ]
  }
}

export default emptyResume;