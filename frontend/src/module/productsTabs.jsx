'use client'
import ProductsCard from '@/ui/productsCard'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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
				`http://localhost:3000/api/categories?lang=${locale}`
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
					`http://localhost:3000/api/products?categoryId=${category.id}&lang=${locale}`
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
	console.log(
		productsByCategory[13]?.map(el => (el.productsCategoryId === 13 ? el : ''))
	)
	return (
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
							{productsByCategory[category.id]?.map(product =>
								product.productsCategoryId === category.id ? (
									<ProductsCard
										{...product.translations[0]}
										id={product.id}
										key={product.id}
									/>
								) : (
									''
								)
							) || <p>Нет продуктов для этой категории</p>}
						</CardBody>
					</Card>
				</Tab>
			))}
		</Tabs>
	)
}

export default ProductsTabs
