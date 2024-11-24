'use client'
import { API_BASE_URL } from '@/api/config'
import image from '@/public/HeroImage.jpg'
import Card from '@/ui/card'
import { Pagination } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const TechniquePage = () => {
	const [place, setPlace] = useState(false)
	const [techniques, setTechniques] = useState([])


	const { locale } = useParams() || {}

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/techniques?lang=${locale}`)
			const data = await response.json()
			setTechniques(data)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	const [page, setPage] = useState(1)
	const cardsPerPage = 4 // Количество карточек на странице

	const totalPages = Math.ceil(techniques.length / cardsPerPage)

	const currentItems = useMemo(() => {
		const start = (page - 1) * cardsPerPage
		const end = start + cardsPerPage
		return techniques.slice(start, end)
	}, [page, techniques])
	return (
		<div className='py-5 container px-3 mx-auto'>
			<div className='grid grid-cols-2 gap-4'>
				{currentItems?.map(el => (
					<Card
						key={el.id}
						image={el.image}
						{...el?.translations[0]}
						place={place}
						setPlace={setPlace}
						isButton={false}
					/>
				))}
			</div>

			<div className='flex justify-center items-center py-6'>
				<Pagination
					total={totalPages}
					initialPage={1}
					page={page}
					onChange={setPage}
				/>
			</div>
		</div>
	)
}

export default TechniquePage
