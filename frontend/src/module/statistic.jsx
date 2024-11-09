'use client'
import image1 from '@/public/cott.png'
import image3 from '@/public/cotton.png'
import image2 from '@/public/material.png'
import image4 from '@/public/threads.png'
import CardMotion from '@/ui/cardMotion'
import TextMotion from '@/ui/textMotion'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
const Statistic = () => {
	const { locale } = useParams() || {}
	const section = useMemo(
		() => ({
			ru: {
				statistic: 'Статистика',
				statisticTon: 'Тонны в год',
			},
			en: {
				statistic: 'Statistic',
				statisticTon: 'Tons per year',
			},
			uz: {
				statistic: 'Statistika',
				statisticTon: 'Yiliga tonna',
			},
			cn: {
				statistic: '统计',
				statisticTon: '每年吨数',
			},
		}),
		[]
	)
	const title = section[locale]?.statistic || 'Statistic'
	const statisticTon = section[locale]?.statisticTon || 'statisticTon'

	const items = [
		{
			image: image1,
			title: `25000 ${statisticTon}`,
		},
		{
			image: image2,
			title: `7200 t ${statisticTon}`,
		},
		{
			image: image3,
			title: `6000 ${statisticTon}`,
		},
		{
			image: image4,
			title: `1000000 ${statisticTon}`,
		},
	]

	return (
		<TextMotion className='container px-3 mx-auto'>
			<h3 className='text-3xl py-4 text-center'>{title}</h3>
			<div className='grid md:grid-cols-4 sm:grid-cols-2 py-10 gap-5 text-black'>
				{items.map((el, id) => (
					<CardMotion
						index={id}
						key={id}
						className='flex flex-col items-center'
					>
						<Image src={el.image.src} width={70} height={70} alt='statistic' />
						<p>{el.title}</p>
					</CardMotion>
				))}
			</div>
		</TextMotion>
	)
}

export default Statistic
