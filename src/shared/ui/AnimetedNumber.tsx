import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const AnimetedNumber = ({
  value,
  duration = 1,
  ease = "power1.out",
}: {
  value: number;
  duration?: number;
  ease?: string;
}) => {
  const numberRef = useRef<HTMLParagraphElement>(null);
  const proxy = useRef({ current: value });

  useGSAP(() => {
    gsap.to(proxy.current, {
      current: value,
      duration,
      ease,
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = String(
            Math.round(proxy.current.current),
          );
        }
      },
    });
  }, [value]);

  return <p ref={numberRef}>{value}</p>;
};
