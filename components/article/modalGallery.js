import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import styles from './component.module.css';

import { Pagination, EffectCreative, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function ModalGallery({galleryData}) {
  const galleryID = 'modalGallery' + galleryData.id
  React.useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      showHideAnimationType: 'zoom',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);
  return (
    <div className={["pswp-gallery", styles.modalGallery].join(' ')} id={galleryID}>
        <Swiper className={styles.gallerySlider} style={{"--swiper-pagination-color" : "#FF9742", "--swiper-pagination-bullet-size": "12px",}}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            clickable: true,
            nextEl: '.gallery-swiper-button-next',
            prevEl: '.gallery-swiper-button-prev',
            disabledClass: 'gallery-swiper-button-disabled'
          }}
          pagination={{
            clickable: true
          }}
          
          modules={[Pagination, EffectCreative, Navigation]}
          effect={'creative'}
          creativeEffect={{
              prev: {
                shadow: false,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
        >
          {galleryData.content.map((imageRel, index) => {
            return (
              <SwiperSlide key={index} className={styles.gallerySlide}>
                <a className={'flex justify-center'} href={imageRel} target='_blank'  rel="noreferrer">
                  <img src={imageRel}></img>
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={styles.gallerySliderNavigation}>
          <div className='gallery-swiper-button gallery-swiper-button-prev'>
            <Image height={30} width={30} src={'/icons/arrow_white.svg'} alt=''></Image>
          </div>
          <div className='gallery-swiper-button gallery-swiper-button-next'>
            <Image height={30} width={30} src={'/icons/arrow_white.svg'} alt=''></Image>
          </div>
        </div>
        
    </div>
    
  );
};