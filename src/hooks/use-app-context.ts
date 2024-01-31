import { createContext, useState, Context } from 'react';

export type AppContextProps = {
  force4k: boolean;
  setForce4k: (force4k: boolean) => void
};

const AppContext = createContext<AppContextProps>({
  force4k: false,
  setForce4k: (_: boolean) => {},
});

type AppContextHookAPI = AppContextProps & {
  AppContext: Context<AppContextProps>;
};

export const useAppContext = (): AppContextHookAPI => {
  const [force4k, setForce4k] = useState(false);

  return {
    AppContext,
    force4k,
    setForce4k,
  };
};
