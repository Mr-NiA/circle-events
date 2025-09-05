import { forwardRef, useImperativeHandle, useRef } from "react";
import { AnimetedNumber } from "../AnimetedNumber";
import styles from "./styles.module.scss";

interface IProps {
  minmax: {
    min: number;
    max: number;
  };
  tab: number;
  buttons: {
    label: string;
    targetRotation: number;
  }[];
  isAnimating: boolean;
  handleButtonClick: (i: number) => void;
  rotation: number;
}

export const CircleRotate = forwardRef(
  (
    { tab, minmax, buttons, isAnimating, handleButtonClick, rotation }: IProps,
    ref,
  ) => {
    const circleRef = useRef(null);
    const buttonsContainerRef = useRef(null);
    const titleRef = useRef(null);

    useImperativeHandle(ref, () => ({
      circle: circleRef.current,
      buttonsContainer: buttonsContainerRef.current,
      title: titleRef.current,
    }));

    return (
      <div className={styles.container}>
        <div className={styles.datesContainer}>
          <AnimetedNumber value={minmax.min} />
          <AnimetedNumber value={minmax.max} />
        </div>
        <div className={styles.circleContainer}>
          <p ref={titleRef} className={styles.title}>
            {buttons[tab].label}
          </p>
          <div ref={circleRef} className={styles.circle}>
            <div ref={buttonsContainerRef} className={styles.buttonsContainer}>
              {buttons.map((button, i) => (
                <div key={button.label} className={styles.btnWrapper}>
                  {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    className={tab === i ? styles.selected : ""}
                    onClick={() => handleButtonClick(i)}
                    disabled={isAnimating}
                    style={{
                      transform: `rotate(${rotation > 0 ? -rotation : Math.abs(rotation)}deg)`,
                    }}
                  >
                    <span>{i + 1}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CircleRotate.displayName = "CircleRotate";
