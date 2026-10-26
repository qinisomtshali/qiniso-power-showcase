import { createContext, useContext } from "react";

/** `ready` flips to true as the loader curtain starts to lift. Hero content waits on it. */
export const IntroContext = createContext({ ready: false });
export const useIntro = () => useContext(IntroContext);
