'use client'
import { API_BASE_URL } from '@/api/config'
import CardMotion from '@/ui/cardMotion'
import ProductsCard from '@/ui/productsCard'
import { Card, CardBody, Pagination, Tab, Tabs, Spinner } from '@nextui-org/react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ProductsTabs = () => {
	const [categories, setCategories] = useState([])
	const name = useSearchParams().get('name')
	const [activeCategory, setActiveCategory] = useState(name) // Активная категория
	const [productsByCategory, setProductsByCategory] = useState({})
	const [loadingCategories, setLoadingCategories] = useState(true) // Состояние загрузки категорий
	const [loadingProducts, setLoadingProducts] = useState(true) // Состояние загрузки продуктов
	const params = useParams()
	const locale = params?.locale || 'en' // Установите значение по умолчанию

	useEffect(() => {
		if (name && activeCategory !== name) {
			setActiveCategory(name)
		}
	}, [name, activeCategory])

	// Получение категорий
	const fetchCategories = async () => {
		try {
			setLoadingCategories(true) // Начинаем загрузку категорий
			const response = await fetch(`${API_BASE_URL}/categories?lang=${locale}`)
			if (!response.ok) throw new Error('Ошибка при получении категорий')
			const data = await response.json()
			setCategories(data)

			// Устанавливаем первую категорию активной
			if (data.length > 0) setActiveCategory(data[0].id)
		} catch (error) {
			console.error('Ошибка при загрузке категорий:', error)
		} finally {
			setLoadingCategories(false) // Завершаем загрузку категорий
		}
	}

	// Получение продуктов для всех категорий
	const fetchProductsByCategory = async () => {
		try {
			setLoadingProducts(true) // Начинаем загрузку продуктов
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
		} finally {
			setLoadingProducts(false) // Завершаем загрузку продуктов
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
			{/* Индикатор загрузки для категорий */}
			{loadingCategories ? (
				<div className="flex justify-center py-6">
					<Spinner size="lg" />
				</div>
			) : (
				<Tabs
					className='max-[950px]:w-full'
					isVertical={isVertical}
					aria-label='Категории'
					selectedKey={activeCategory} // Устанавливаем активный таб
					onSelectionChange={setActiveCategory} // Меняем активную категорию
				>
					{categories.map(category => (
						<Tab
							href={`/${locale}/categories?name=${category.id}`}
							key={category.id}
							title={category.translations[0]?.name || 'Без названия'}
						>
							<Card>
								<CardBody>
									{/* Индикатор загрузки для продуктов */}
									{loadingProducts ? (
										<div className="flex justify-center py-6">
											<Spinner size="lg" />
										</div>
									) : (
										currentItems.map((product, index) =>
											product.productsCategoryId === category.id ? (
												<CardMotion index={index} key={index}>
													<ProductsCard
														{...product.translations[0]}
														id={product.id}
														image={product.images[0].image.split(',')[0]}
													/>
												</CardMotion>
											) : null
										) || <p>Нет продуктов для этой категории</p>
									)}
								</CardBody>
							</Card>
						</Tab>
					))}
				</Tabs>
			)}
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
	