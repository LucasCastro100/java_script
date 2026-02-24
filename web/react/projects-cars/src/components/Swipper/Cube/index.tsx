import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";
import "swiper/css/effect-cube";
import "swiper/css";

type SwiperCubeProps = {
  images: { url: string }[];
};

export function SwiperCube({ images }: SwiperCubeProps) {
  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      loop={true}
      pagination={true}
      modules={[EffectCube, Pagination]}
      className="w-[300px] md:w-[500px] h-auto"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img.url} className="rounded-xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
