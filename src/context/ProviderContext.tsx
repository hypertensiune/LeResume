import { createContext } from 'react';

import { initializeApp } from 'firebase/app';

import { Authentication } from '../services/auth';
import firebaseConfig from '../services/firebaseConfig';
import { Database } from '../services/database';

type Services = {
  auth: Authentication,
  db: Database
};

const app = initializeApp(firebaseConfig);

const services: Services = {
  auth: new Authentication(app),
  db: new Database(app)
};

const AppContext = createContext({} as Services);

function ProviderContext({ children }: any) {
  return <AppContext.Provider value={services}>{children}</AppContext.Provider>
}

export { AppContext, ProviderContext };

