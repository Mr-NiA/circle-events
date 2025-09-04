import { CircleButton } from "../CircleButton/CircleButton";
import { ArrowIcon } from "./ArrowIcon";
import styles from "./styles.module.scss";

interface IProps {
  countTitle?: string;
  handleChangeTab: (i: number) => void;
  maxPages: number;
  tab: number;
}

export const SimplePagination = ({
  tab,
  maxPages,
  countTitle,
  handleChangeTab,
}: IProps) => {
  return (
    <div className={styles.container}>
      {countTitle && <p>{countTitle}</p>}
      <div className={styles.pagination}>
        <CircleButton
          onClick={() => handleChangeTab(tab - 1)}
          disabled={tab === 0}
          style={{ transform: "rotate(180deg)" }}
        >
          <ArrowIcon />
        </CircleButton>
        <CircleButton
          onClick={() => handleChangeTab(tab + 1)}
          disabled={tab === maxPages - 1}
        >
          <ArrowIcon />
        </CircleButton>
      </div>
    </div>
  );
};
