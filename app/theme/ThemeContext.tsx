import React, { useContext, useState, Dispatch, SetStateAction } from 'react';

import defaultTheme from './defaultTheme';
import { ITheme } from './defaultTheme.d';

interface IThemeContext {
  theme: ITheme;
  setTheme: Dispatch<SetStateAction<ITheme>>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: defaultTheme,
  setTheme: () => {
    //
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
