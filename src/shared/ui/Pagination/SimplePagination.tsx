import { useCallback } from "react";
import { CircleButton } from "../CircleButton/CircleButton";
import { ArrowIcon } from "./ArrowIcon";
import styles from "./styles.module.scss";

interface IProps {
  countTitle?: string;
  handleChangeTab: (i: number) => void;
  maxPages: number;
  tab: number;
  isDisabled?: boolean;
}

export const SimplePagination = ({
  tab,
  maxPages,
  countTitle,
  handleChangeTab,
  isDisabled,
}: IProps) => {
  const _handleChangeTab = useCallback(
    (value: number) => () => handleChangeTab(tab + value),
    [tab, handleChangeTab],
  );

  return (
    <div className={styles.container}>
      {countTitle && <p>{countTitle}</p>}
      <div className={styles.pagination}>
        <CircleButton
          onClick={_handleChangeTab(-1)}
          disabled={tab === 0 || isDisabled}
          style={{ transform: "rotate(180deg)" }}
        >
          <ArrowIcon />
        </CircleButton>
        <CircleButton
          onClick={_handleChangeTab(1)}
          disabled={tab === maxPages - 1 || isDisabled}
        >
          <ArrowIcon />
        </CircleButton>
      </div>
    </div>
  );
};
