import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

interface IProps {
  startProps: gsap.TweenVars;
  endProps: gsap.TweenVars;
}

export const useSimpleGsapAmination = ({ startProps, endProps }: IProps) => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleAnimation = contextSafe(() => {
    gsap.to(containerRef.current, {
      ...startProps,
      onComplete: () => {
        gsap.to(containerRef.current, {
          ...endProps,
        });
      },
    });
  });

  return {
    containerRef,
    handleAnimation,
  };
};
