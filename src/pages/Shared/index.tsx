import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { AppContext } from "@context/ProviderContext";

import Resume from "@pages/Build/components/Resume";

import './shared.scss';

export default function Shared() {

  const { user, rid } = useParams();
  const [_, setSearchParams] = useSearchParams();
  
  const services = useContext(AppContext);

  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    services.db.getSharedResume(user!, rid!).then(res => {
      setResume(res);
      setSearchParams(prev => { 
        prev.set('template', `${res?.template}`);
        return prev;
      });
    });
  }, []);

  if(resume == null) {
    return <h1>Resume unavailable.</h1>
  }

  return (
    <Resume resume={resume}/>
  )
}