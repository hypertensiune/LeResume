import { useParams, useSearchParams } from "react-router-dom";

import './shared.scss';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/ProviderContext";
import Resume from "@pages/Build/components/Resume";

export default function Shared() {

  const { user, rid } = useParams();
  const [searchParams] = useSearchParams();
  
  const services = useContext(AppContext);

  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    services.db.getSharedResume(user!, rid!).then(res => {
      setResume(res);
      searchParams.append('template', '1');
    });
  }, []);

  if(resume == null) {
    return <h1>Resume unavailable.</h1>
  }

  return (
    <Resume resume={resume}/>
  )
}