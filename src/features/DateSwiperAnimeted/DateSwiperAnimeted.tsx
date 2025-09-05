import { useIsMobile } from "@shared/hooks";
import {
  AnimetedNumber,
  CircleRotate,
  SimplePagination,
  Swiper,
  SwiperMobile,
} from "@shared/ui";
import { useMemo, useState } from "react";
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
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const sections = useMemo(() => data.map((el) => el.name), [data]);
  const selectedItems = data[selectedTab].items;
  const selectedTabName = sections[selectedTab];

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

  const {
    handleButtonClick,
    circleRefs,
    isAnimating,
    buttons,
    itemsContainerRef,
    rotation,
  } = useRotate({
    setSelectedTab,
    buttonsName: sections,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.historicalDate}>Исторические даты</p>
          <div className={styles.historicalMobile}>
            <div className={styles.historicalDateMobile}>
              <AnimetedNumber value={minmax.min} />
              <AnimetedNumber value={minmax.max} />
            </div>
            <p>{selectedTabName}</p>
          </div>
          <SimplePagination
            tab={selectedTab}
            maxPages={sections.length}
            countTitle={countTitle}
            handleChangeTab={handleButtonClick}
            isDisabled={isAnimating}
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

        {!isMobile ? (
          <div className={styles.slideItemsContainer}>
            <Swiper ref={itemsContainerRef} data={selectedItems} />
          </div>
        ) : (
          <div className={styles.slideItemsContainerMobile}>
            <SwiperMobile ref={itemsContainerRef} data={selectedItems} />
          </div>
        )}
      </div>
    </div>
  );
};
