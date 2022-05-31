import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type LocaleContext = {
  locales: string[];
};

interface LocaleContextProviderProps {
  locales: string[];
  children: ReactNode;
}

const MyContext = createContext<LocaleContext | null>(null);

export const LocaleContextProvider = ({
  locales,
  children,
}: LocaleContextProviderProps) => {
  const value = { locales };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const throwIfNoProvider = () => {
  throw new Error("Please wrap your application in a LocaleContextProvider.");
};

export const useLocales = () => {
  const { locales } = useContext(MyContext) ?? throwIfNoProvider();
  return locales;
};
