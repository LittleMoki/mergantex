'use client'
import { API_BASE_URL } from '@/api/config'
import Card from '@/ui/card'
import TextMotion from '@/ui/textMotion'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const Place = () => {
	const section = useMemo(
		() => ({
			ru: {
				place: 'Наши заводы и фабрики',
			},
			en: {
				place: 'Our Factories and Plants',
			},
			uz: {
				place: 'Bizning Zavod va Fabrikalar',
			},
			cn: {
				place: '我们的工厂和厂房',
			},
		}),
		[]
	)
	const [place, setPlace] = useState(false)
	const { locale } = useParams() || {}
	const [factories, setFactories] = useState([])

	const fetchFactories = async () => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/factories?lang=${locale}`
			)
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

	const title = section[locale]?.place || 'Place'

	return (
		<div className='container px-3 mx-auto '>
			<TextMotion>
				<h3 className='text-3xl py-4 text-center'>{title}</h3>
			</TextMotion>
			<div
				id='place'
				className=' grid gap-3  text-white lg:grid-cols-2 py-10'
			>
				{factories.slice(-4).map((el, index) => (
					<Card
						isName={true}
						isButton={false}
						key={el.id}
						{...el.translations[0]}
						image={el.image}
						place={place}
						setPlace={setPlace}
						index={index}
					/>
				))}
			</div>
		</div>
	)
}

export default Place
