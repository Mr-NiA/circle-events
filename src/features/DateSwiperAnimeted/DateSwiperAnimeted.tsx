import { useMemo, useState } from "react";
import {
  AnimetedNumber,
  CircleRotate,
  SimplePagination,
  Swiper,
  SwiperMobile,
} from "../../shared/ui";
import styles from "./styles.module.scss";
import { useRotate } from "./useRotate";

interface Item {
  title: string;
  date: number;
  description: string;
}

interface Section {
  name: string;
  items: Item[];
}

interface IProps {
  data: Section[];
}

export const DateSwiperAnimeted = ({ data }: IProps) => {
  const sections = data.map((el) => el.name);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const selectedItems = data[selectedTab].items;

  const minmax = useMemo(() => {
    const arrayDate = Array.from(
      selectedItems.reduce((acc, el) => {
        if (!acc.has(el.date)) {
          acc.add(el.date);
        }
        return acc;
      }, new Set<number>()),
    );

    return {
      min: Math.min(...arrayDate),
      max: Math.max(...arrayDate),
    };
  }, [selectedItems]);

  const countTitle = `0${selectedTab + 1}/0${sections.length}`;

  const rotateProps = useRotate({
    setSelectedTab,
    buttonsName: sections,
  });

  const {
    handleButtonClick,
    circleRefs,
    isAnimating,
    buttons,
    itemsContainerRef,
    itemsContainerRefMobile,
    rotation,
  } = rotateProps;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.historicalDate}>Исторические даты</p>
          <div className={styles.historicalDateMobile}>
            <AnimetedNumber value={minmax.min} />
            <AnimetedNumber value={minmax.max} />
          </div>
          <SimplePagination
            tab={selectedTab}
            maxPages={sections.length}
            countTitle={countTitle}
            handleChangeTab={handleButtonClick}
          />
        </div>
        <div className={styles.wheels}>
          <CircleRotate
            ref={circleRefs}
            tab={selectedTab}
            handleButtonClick={handleButtonClick}
            minmax={minmax}
            buttons={buttons}
            rotation={rotation}
            isAnimating={isAnimating}
          />
        </div>

        <div className={styles.slideItemsContainer}>
          <Swiper ref={itemsContainerRef} data={selectedItems} />
        </div>
        <div className={styles.slideItemsContainerMobile}>
          <SwiperMobile ref={itemsContainerRefMobile} data={selectedItems} />
        </div>
      </div>
    </div>
  );
};
