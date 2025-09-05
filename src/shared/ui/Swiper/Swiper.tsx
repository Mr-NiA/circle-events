import { Navigation } from "swiper/modules";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "./custom.swiper-bullet.css";
import { forwardRef } from "react";
import { useBackToStartSwiper } from "./useBackToStartSwiper";

export const Swiper = forwardRef<
  HTMLDivElement,
  { data: Record<string, any>[] }
>(({ data }, ref) => {
  const swiperRef = useBackToStartSwiper(data);
  return (
    <div ref={ref}>
      <ReactSwiper
        slidesPerView={"auto"}
        navigation
        spaceBetween={80}
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data.map((el, i) => (
          <SwiperSlide key={i}>
            <div className={styles.item}>
              <p className={styles.title}>{el.date}</p>
              <p className={styles.description}>{el.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  );
});

Swiper.displayName = "Swiper";
