import { createContext, useContext } from "react";

export type ScrollTarget = string | number | HTMLElement;

export interface ScrollApi {
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
}

export const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useScroll = () => useContext(ScrollContext);
