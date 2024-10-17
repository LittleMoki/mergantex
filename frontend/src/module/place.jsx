'use client'
import Card from '@/ui/card'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Place = () => {
	const [place, setPlace] = useState(false)
	const { locale } = useParams() || {}
	const [factories, setFactories] = useState([])

	const fetchFactories = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/factories?lang=${locale}`
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

	return (
		<div
			id='place'
			className='container grid gap-3 text-white lg:grid-cols-2 px-3 mx-auto py-10'
		>
			{factories.map(el => (
				<Card {...el.translations[0]} place={place} setPlace={setPlace} />
			))}
		</div>
	)
}

export default Place
