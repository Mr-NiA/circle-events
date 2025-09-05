import { useEffect, useRef } from "react";

export const useBackToStartSwiper = (deps: any) => {
  const swiperRef = useRef<any>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [deps]);

  return swiperRef;
};
