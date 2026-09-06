import { useEffect, type RefObject } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  targetRef?: RefObject<HTMLElement>;
};

export function ScrollToTop({ targetRef }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const target = targetRef?.current;

    if (target) {
      target.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, targetRef]);

  return null;
}

export default ScrollToTop;
