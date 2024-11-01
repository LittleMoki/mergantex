'use client'
import { API_BASE_URL } from '@/api/config'
import Card from '@/ui/card'
import TextMotion from '@/ui/textMotion'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const Technique = () => {
	const [place, setPlace] = useState(false)
	const { locale } = useParams() || {}

	const [factories, setFactories] = useState([])

	const fetchFactories = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/techniques?lang=${locale}`)
			if (!response.ok) throw new Error('Ошибка при получении фабрик')
			const data = await response.json()
			setFactories(Array.isArray(data) ? data : [])
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	useEffect(() => {
		fetchFactories()
	}, [])

	const section = useMemo(
		() => ({
			ru: {
				technique: 'Техника',
			},
			en: {
				technique: 'Technique',
			},
			uz: {
				technique: 'Texnika',
			},
			cn: {
				technique: '技术',
			},
		}),
		[]
	)
	const title = section[locale]?.technique || 'Technique'

	return (
		<div className='container px-3 mx-auto'>
			<TextMotion>
				<h3 className='text-3xl py-4 text-center'>{title}</h3>
			</TextMotion>
			<div
				id='technique'
				className='grid text-white py-10 gap-3 lg:grid-cols-2'
			>
				{factories.slice(-4).map((el, index) => (
					<Card
						index={index}
						{...el.translations[0]}
						image={el.image}
						place={place}
						setPlace={setPlace}
					/>
				))}
			</div>
		</div>
	)
}

export default Technique
