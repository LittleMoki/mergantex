'use client'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'
import CustomEditor from '@/ui/customEditor'
import {
	Button,
	Card,
	CardHeader,
	Image,
	Input,
	Select,
	SelectItem,
} from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const ProductForm = ({ onProductCreated }) => {
	const [productsCategoryId, setProductsCategoryId] = useState('')
	const [categories, setCategories] = useState([])
	const [images, setImages] = useState([]) // Change to hold actual file objects
	const { locale } = useParams()
	const [translations, setTranslations] = useState([
		{
			language: 'ru',
			title: '',
			subtitle: '',
			description: '',
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
		},
		{
			language: 'en',
			title: '',
			subtitle: '',
			description: '',
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
		},
		{
			language: 'uz',
			title: '',
			subtitle: '',
			description: '',
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
		},
		{
			language: 'cn',
			title: '',
			subtitle: '',
			description: '',
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
		},
	])
	const [products, setProducts] = useState([])

	const fetchCategories = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/categories?lang=${locale}`)
			if (!response.ok) throw new Error('Ошибка при получении категорий')

			const data = await response.json()
			setCategories(data)
		} catch (error) {
			console.error('Ошибка при загрузке категорий:', error)
		}
	}

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/products?lang=${locale}`)
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

	const handleFileChange = e => {
		const files = Array.from(e.target.files)
		setImages(files) // Store the actual file objects
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('productsCategoryId', Number(productsCategoryId))
		formData.append('translations', JSON.stringify(translations))

		images.forEach(image => {
			formData.append('images', image) // Append each file
		})
		try {
			const response = await fetch(`${API_BASE_URL}/products`, {
				method: 'POST',
				body: formData,
			})
			if (!response.ok) throw new Error('Ошибка при создании продукта')

			await fetchProducts() // Update product list
			setTranslations([
				{
					language: 'ru',
					title: '',
					subtitle: '',
					description: '',
					metaTitle: '',
					metaDescription: '',
					metaKeywords: '',
				},
				{
					language: 'en',
					title: '',
					subtitle: '',
					description: '',
					metaTitle: '',
					metaDescription: '',
					metaKeywords: '',
				},
				{
					language: 'uz',
					title: '',
					subtitle: '',
					description: '',
					metaTitle: '',
					metaDescription: '',
					metaKeywords: '',
				},
				{
					language: 'cn',
					title: '',
					subtitle: '',
					description: '',
					metaTitle: '',
					metaDescription: '',
					metaKeywords: '',
				},
			])
			setImages([]) // Clear images after submission
		} catch (error) {
			console.error('Ошибка при создании продукта:', error)
		}
	}

	const handleDelete = async productId => {
		try {
			const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Ошибка при удалении продукта')

			await fetchProducts() // Update product list after deletion
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error)
		}
	}

	return (
		<div className='px-3 mx-auto container w-full'>
			<form className='flex flex-col gap-3 py-5' onSubmit={handleSubmit}>
				<h2 className='text-3xl font-bold text-white pb-3'>
					Создание карточек
				</h2>

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

				<input
					required
					type='file'
					multiple
					onChange={handleFileChange} // Store files
				/>

				{translations.map((t, index) => (
					<div className='flex flex-col gap-2' key={index}>
						<Input
							type='text'
							placeholder={`metaTitle (${t.language})`}
							value={t.metaTitle}
							onChange={e =>
								handleChangeTranslation(index, 'metaTitle', e.target.value)
							}
							required
						/>
						<Input
							type='text'
							placeholder={`metaDescription (${t.language})`}
							value={t.metaDescription}
							onChange={e =>
								handleChangeTranslation(
									index,
									'metaDescription',
									e.target.value
								)
							}
							required
						/>
						<Input
							type='text'
							placeholder={`metaKeywords (${t.language})`}
							value={t.metaKeywords}
							onChange={e =>
								handleChangeTranslation(index, 'metaKeywords', e.target.value)
							}
							required
						/>
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
						<CustomEditor
							value={t.description}
							fn={e => handleChangeTranslation(index, 'description', e)}
						/>
					</div>
				))}

				<Button type='submit'>Создать продукт</Button>
			</form>

			<div className='grid gap-3 grid-cols-2'>
				{products.map(product => (
					<Link
						key={product.id}
						href={`/${locale}/admin/products/${product.id}`}
					>
						<Card>
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
							<Image
								className='brightness-50'
								src={`${API_BASE_URL_PHOTO}/${
									product.images[0]?.image.split(',')[0]
								}`} // Use product.image
								alt='product'
							/>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}

export default ProductForm
