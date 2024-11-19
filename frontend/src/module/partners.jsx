'use client'
import image1 from '@/public/partnerLogo1.png'
import image10 from '@/public/partnerLogo10.png'
import image11 from '@/public/partnerLogo11.png'
import image12 from '@/public/partnerLogo12.png'
import image13 from '@/public/partnerLogo13.jpg'
import image2 from '@/public/partnerLogo2.svg'
import image3 from '@/public/partnerLogo3.svg'
import image4 from '@/public/partnerLogo4.jpg'
import image5 from '@/public/partnerLogo5.jpg'
import image6 from '@/public/partnerLogo6.jpg'
import image7 from '@/public/partnerLogo7.jpg'
import image8 from '@/public/partnerLogo8.jpg'
import image9 from '@/public/partnerLogo9.png'
import CardMotion from '@/ui/cardMotion'
import TextMotion from '@/ui/textMotion'
import { Image } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Partners = () => {
	const { locale } = useParams() || {}
	const items = [
		{ image: image1.src },
		{ image: image2.src },
		{ image: image3.src },
		{ image: image4.src },
		{ image: image5.src },
		{ image: image6.src },
		{ image: image7.src },
		{ image: image8.src },
		{ image: image9.src },
		{ image: image10.src },
		{ image: image11.src },
		{ image: image12.src },
		{ image: image13.src },
	]

	const section = useMemo(
		() => ({
			ru: { partners: 'Партнеры' },
			en: { partners: 'Partners' },
			uz: { partners: 'Hamkorlar' },
			cn: { partners: '合作伙伴' },
		}),
		[]
	)

	const title = section[locale]?.partners || 'Partners'

	return (
		<div className='container px-3 mx-auto'>
			<TextMotion>
				<h3 className='text-3xl py-4 text-center'>{title}</h3>
			</TextMotion>
			<Swiper
				breakpoints={{
					640: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 5,
					},
				}}
				spaceBetween={30}
				pagination={{ clickable: true }}
				centeredSlides={true}
				loop={true}
				autoplay={{
					delay: 1000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Pagination]}
			>
				{items.map((el, index) => (
					<SwiperSlide key={index}>
						<CardMotion index={index}>
							<Image
								className='w-full h-[300px] object-contain'
								src={el.image}
								alt='partnerLogo'
							/>
						</CardMotion>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Partners
