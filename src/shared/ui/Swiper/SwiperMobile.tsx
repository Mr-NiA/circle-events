import { Pagination } from "swiper/modules";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "./custom.swiper-bullet.css";
import { forwardRef } from "react";
import { useBackToStartSwiper } from "./useBackToStartSwiper";

export const SwiperMobile = forwardRef<
  HTMLDivElement,
  { data: Record<string, any>[] }
>(({ data }, ref) => {
  const swiperRef = useBackToStartSwiper(data);

  return (
    <div ref={ref}>
      <ReactSwiper
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        spaceBetween={30}
        modules={[Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data.map((el, i) => (
          <SwiperSlide key={i}>
            <div className={styles.itemMobile}>
              <p className={styles.title}>{el.date}</p>
              <p className={styles.description}>{el.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  );
});

SwiperMobile.displayName = "SwiperMobile";
