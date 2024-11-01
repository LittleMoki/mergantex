'use client'
import { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import bg from '@/public/bg.png'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, EffectFade,Pagination } from 'swiper/modules'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'

const Hero = () => {
	const [homeVideo, setHomeVideo] = useState([])

	const fetchVideoHome = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/video`)
			if (!response.ok) throw new Error('Ошибка при создании видео')

			const data = await response.json()

			setHomeVideo(data)
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
		}
	}

	useEffect(() => {
		fetchVideoHome()
	}, [])
	return (
		<div className='h-[calc(70vh-64px)] w-full'>
			<Swiper
				spaceBetween={30}
				effect={'fade'}
				centeredSlides={true}
				loop={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, EffectFade,Pagination]}
				className='h-full'
			>
				<SwiperSlide className='w-full h-full'>
						<img
							className='w-full h-full object-cover'
							src={bg.src}
						/>	
					</SwiperSlide>
				{homeVideo.map(el => (
					<SwiperSlide key={el} className='w-full h-full'>
						<img
							className='w-full h-full object-cover'
							src={`${API_BASE_URL_PHOTO}/${el.image}`}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Hero
