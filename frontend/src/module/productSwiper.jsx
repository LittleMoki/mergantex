'use client'
import productCardBg from '@/public/HeroImage.jpg'
import { useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import Image from 'next/image'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

const ProductSwiper = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	return (
		<div className='w-full h-full'>
			<Swiper
				style={{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#fff',
				}}
				loop={true}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mySwiper2'
			>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mySwiper'
			>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={productCardBg.src}
						width={productCardBg.width}
						height={productCardBg.height}
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	)
}

export default ProductSwiper
