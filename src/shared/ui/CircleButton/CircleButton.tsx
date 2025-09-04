import type { ComponentProps } from "react";
import styles from "./styles.module.scss";

export const CircleButton = ({
  children,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button className={styles.wrapper} {...props}>
      {children}
    </button>
  );
};
