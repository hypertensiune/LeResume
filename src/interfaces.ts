interface GithubRepo {
    name: string;
    description: string;
    language: string;
    url: string;
}

interface Language {
    name: string;
    color: string;
}

interface ResumeData {
    basics: Details;
    education: Education[];
    certifications: Certification[];
    work: Work[];
    projects: Project[];
    skills: SkillGroup[];
}

interface Details {
    firstname: string;
    lastname: string;
    jobtitle: string;
    phone: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
}

interface Education {
    id: number;
    institution: string;
    degree: string;
    start: string;
    end: string;
}

interface Certification {
    id: number;
    issuer: string;
    name: string;
    date: string;
}

interface Work {
    id: number;
    position: string;
    company: string;
    start: string;
    end: string;
    location: string;

    description: string[];
}

interface Project {
    id: number;
    name: string;
    languages: string[];
    github: string;
    website: string;
    description: string[];
}

interface SkillGroup {
    id: number;
    type: string;
    skills: string;
}