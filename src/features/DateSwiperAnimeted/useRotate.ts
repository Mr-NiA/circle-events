import { useGSAP } from "@gsap/react";
import { useSimpleGsapAmination } from "@shared/hooks";
import { gsap } from "gsap";
import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";

const fix = 15;

interface IProps {
  buttonsName: string[];
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const useRotate = ({ buttonsName, setSelectedTab }: IProps) => {
  const circleRefs = useRef<any>({
    circle: null,
    buttonsContainer: null,
    title: null,
  });

  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const buttons = useMemo(() => {
    const gap = 360 / buttonsName.length;
    return buttonsName.reduce(
      (acc, label, i) => {
        acc.push({ label, targetRotation: i * gap });
        return acc;
      },
      [] as { label: string; targetRotation: number }[],
    );
  }, [buttonsName]);

  const btnContext = useGSAP(() => updateButtonPositions(), {
    scope: circleRefs?.current?.buttonsContainer,
  });

  const titleContext = useGSAP({ scope: circleRefs.current.title });

  const handleTitleAnimation = titleContext.contextSafe(() => {
    gsap.to(circleRefs.current.title, {
      opacity: 0,
      duration: 0,
      onComplete: () => {
        gsap.to(circleRefs.current.title, {
          opacity: 1,
          duration: 1,
        });
      },
    });
  });

  const itemContainer = useSimpleGsapAmination({
    startProps: { opacity: 0, duration: 0 },
    endProps: {
      delay: 0.3,
      opacity: 1,
      duration: 1,
    },
  });

  const updateButtonPositions = btnContext.contextSafe(() => {
    const buttons = circleRefs?.current?.buttonsContainer?.children;
    if (buttons) {
      const radius = 264;

      for (let i = 0; i < buttons.length; i++) {
        const angle = (i * (360 / buttons.length) - 90 + fix) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        gsap.set(buttons[i], {
          x,
          y,
          transformOrigin: "0 0",
        });
      }
    }
  });

  const handleButtonClick = btnContext.contextSafe((i: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const targetRotation = buttons[i].targetRotation;
    const newRotation = -targetRotation;

    setRotation(newRotation);
    gsap.to(circleRefs.current.circle, {
      rotation: newRotation,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setSelectedTab(i);
        handleTitleAnimation();
        itemContainer.handleAnimation();
        updateButtonPositions();
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });
  });

  return {
    rotation,
    isAnimating,
    buttons,
    circleRefs,
    itemsContainerRef: itemContainer.containerRef,
    handleButtonClick,
  };
};
