'use client'
import image from '@/public/HeroImage.jpg'
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Image,
	Input,
	Select,
	SelectItem,
	Textarea,
} from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const ProductForm = ({ onProductCreated }) => {
	const [productsCategoryId, setProductsCategoryId] = useState('')
	const [categories, setCategories] = useState([])
	const { locale } = useParams()
	const [translations, setTranslations] = useState([
		{ language: 'ru', title: '', subtitle: '', description: '' },
		{ language: 'en', title: '', subtitle: '', description: '' },
		{ language: 'uz', title: '', subtitle: '', description: '' },
	])
	const [products, setProducts] = useState([])

	const fetchCategories = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/categories?lang=${locale}`
			)
			if (!response.ok) throw new Error('Ошибка при получении категорий')

			const data = await response.json()
			setCategories(data)
		} catch (error) {
			console.error('Ошибка при загрузке категорий:', error)
		}
	}

	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products?lang=${locale}`
			)
			if (!response.ok) throw new Error('Ошибка при получении продуктов')

			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchCategories()
		fetchProducts()
	}, [])

	const handleChangeTranslation = (index, field, value) => {
		const newTranslations = [...translations]
		newTranslations[index][field] = value
		setTranslations(newTranslations)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ productsCategoryId, translations }),
			})
			if (!response.ok) throw new Error('Ошибка при создании продукта')

			await fetchProducts() // Обновляем список продуктов
			setProductsCategoryId('')
			setTranslations([
				{ language: 'ru', title: '', subtitle: '', description: '' },
				{ language: 'en', title: '', subtitle: '', description: '' },
				{ language: 'uz', title: '', subtitle: '', description: '' },
			])
		} catch (error) {
			console.error('Ошибка при создании продукта:', error)
		}
	}

	const handleDelete = async productId => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products/${productId}`,
				{ method: 'DELETE' }
			)
			if (!response.ok) throw new Error('Ошибка при удалении продукта')

			await fetchProducts() // Обновляем список продуктов после удаления
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error)
		}
	}

	return (
		<>
			<form className='flex flex-col gap-3 py-5' onSubmit={handleSubmit}>
				<h2 className='text-3xl font-bold text-white pb-3'>Создание карточек</h2>

				<Select
					label='Выберите категорию'
					onChange={e => setProductsCategoryId(Number(e.target.value))}
					required
					value={productsCategoryId}
				>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.translations[0]?.name || 'Без названия'}
						</SelectItem>
					))}
				</Select>

				{translations.map((t, index) => (
					<div className='flex flex-col gap-2' key={index}>
						<Input
							type='text'
							placeholder={`Заголовок (${t.language})`}
							value={t.title}
							onChange={e =>
								handleChangeTranslation(index, 'title', e.target.value)
							}
							required
						/>
						<Input
							type='text'
							placeholder={`Подзаголовок (${t.language})`}
							value={t.subtitle}
							onChange={e =>
								handleChangeTranslation(index, 'subtitle', e.target.value)
							}
						/>
						<Textarea
							placeholder={`Описание (${t.language})`}
							value={t.description}
							onChange={e =>
								handleChangeTranslation(index, 'description', e.target.value)
							}
						/>
					</div>
				))}

				<Button type='submit'>Создать продукт</Button>
			</form>

			<div className='grid gap-3 grid-cols-2'>
				{products.map(product => (
					<Card key={product.id} isFooterBlurred>
						<CardHeader className='absolute flex flex-col items-start z-20 top-0'>
							<FaTrash
								onClick={() => handleDelete(product.id)}
								className='hover:text-red-600 absolute right-4 top-4 cursor-pointer'
							/>
							<h1 className='text-2xl'>
								{product.translations?.[0]?.title || 'Без заголовка'}
							</h1>
							<p className='text-lg'>
								{product.translations?.[0]?.subtitle || 'Без подзаголовка'}
							</p>
						</CardHeader>
						<Image className='brightness-50' src={image.src} alt='product' />
						<CardFooter className='absolute z-10 bottom-0'>
							<p>
								{product.translations?.[0]?.description ||
									'Описание отсутствует'}
							</p>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	)
}

export default ProductForm
