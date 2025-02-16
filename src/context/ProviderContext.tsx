import { createContext } from 'react';

import { initializeApp } from 'firebase/app';

import { Authentication } from '../services/auth';
import firebaseConfig from '../services/firebaseConfig';

type Services = {
  auth: Authentication
};

const services: Services = {
  auth: new Authentication(initializeApp(firebaseConfig))
}

const AppContext = createContext({} as Services);

function ProviderContext({ children }: any) {
  return <AppContext.Provider value={services}>{children}</AppContext.Provider>
}

export { AppContext, ProviderContext };

