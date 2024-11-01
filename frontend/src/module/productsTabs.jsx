'use client'
import { API_BASE_URL } from '@/api/config'
import CardMotion from '@/ui/cardMotion'
import ProductsCard from '@/ui/productsCard'
import { Card, CardBody, Pagination, Tab, Tabs } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ProductsTabs = () => {
	const [categories, setCategories] = useState([])
	const [activeCategory, setActiveCategory] = useState(null) // Активная категория
	const [productsByCategory, setProductsByCategory] = useState({})
	const params = useParams()
	const locale = params?.locale || 'en' // Установите значение по умолчанию

	// Получение категорий
	const fetchCategories = async () => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/categories?lang=${locale}`
			)
			if (!response.ok) throw new Error('Ошибка при получении категорий')
			const data = await response.json()
			setCategories(data)

			// Устанавливаем первую категорию активной
			if (data.length > 0) setActiveCategory(data[0].id)
		} catch (error) {
			console.error('Ошибка при загрузке категорий:', error)
		}
	}

	// Получение продуктов для всех категорий
	const fetchProductsByCategory = async () => {
		try {
			const promises = categories.map(category =>
				fetch(
					`${API_BASE_URL}/products?categoryId=${category.id}&lang=${locale}`
				).then(res => res.json())
			)
			const results = await Promise.all(promises)

			// Создаем объект: { categoryId: [products] }
			const productsMap = categories.reduce((acc, category, index) => {
				acc[category.id] = results[index]
				return acc
			}, {})
			setProductsByCategory(productsMap)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	useEffect(() => {
		if (categories.length > 0) fetchProductsByCategory()
	}, [categories])

	const isVertical = useMediaQuery({ minWidth: 950 })

	const [page, setPage] = useState(1)
	const cardsPerPage = 4 // Количество карточек на странице

	const totalPages =
		Math.ceil(productsByCategory[activeCategory]?.length / cardsPerPage) || 1

	const currentItems = useMemo(() => {
		if (!activeCategory || !productsByCategory[activeCategory]) return []
		const start = (page - 1) * cardsPerPage
		const end = start + cardsPerPage
		return productsByCategory[activeCategory].slice(start, end)
	}, [page, activeCategory, productsByCategory])


	return (
		<>
			<Tabs
				className='max-[950px]:w-full'
				isVertical={isVertical}
				aria-label='Категории'
				selectedKey={activeCategory} // Устанавливаем активный таб
				onSelectionChange={setActiveCategory} // Меняем активную категорию
			>
				{categories.map(category => (
					<Tab
						key={category.id}
						title={category.translations[0]?.name || 'Без названия'}
					>
						<Card>
							<CardBody>
								{currentItems.map((product, index) =>
									product.productsCategoryId === category.id ? (
										<CardMotion index={index} key={index}>
											<ProductsCard
												{...product.translations[0]}
												id={product.id}
												image={product.images[0].image.split(',')[0]}
											/>
										</CardMotion>
									) : null
								) || <p>Нет продуктов для этой категории</p>}
							</CardBody>
						</Card>
					</Tab>
				))}
			</Tabs>
			<div className='flex justify-center items-center py-6'>
				<Pagination
					total={totalPages}
					initialPage={1}
					page={page}
					onChange={setPage}
				/>
			</div>
		</>
	)
}

export default ProductsTabs
