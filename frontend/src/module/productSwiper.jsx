import { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'

const ProductSwiper = ({ id }) => {
	const [images, setImages] = useState([])
	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`${API_BASE_URL}//products/images/${id}`
			)
			if (!response.ok) throw new Error('Ошибка при получении продуктов')

			const data = await response.json()
			setImages(data)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	// Изменено для получения images
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	// Проверьте, что images не пустой
	if (images.length === 0) {
		return <div>No images available</div> // Возвращаем сообщение об отсутствии изображений
	}

	// Используем деструктуризацию для получения image
	return (
		<div className='h-full'>
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
			>
				{images.map((el, index) => (
					<SwiperSlide key={index}>
						<img
						className='w-full h-full object-cover max-h-[500px]'
							src={`${API_BASE_URL_PHOTO}/${el.image}`}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map((el, index) => (
					<SwiperSlide key={index}>
						<img
							className=' size-36  object-cover bg-cover'
							src={`${API_BASE_URL_PHOTO}/${el.image}`}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default ProductSwiper
