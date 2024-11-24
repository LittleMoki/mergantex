'use client'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'
import CustomEditor from '@/ui/customEditor'
import { Button, Image, Input, Select, SelectItem } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const LANGUAGES = ['ru', 'en', 'uz', 'cn']

const ProductUpdateAdminPage = () => {
	const { id, locale } = useParams()
	const router = useRouter()

	const [productsCategoryId, setProductsCategoryId] = useState('')
	const [categories, setCategories] = useState([])
	const [images, setImages] = useState([])
	const [productImages, setProductImages] = useState([])
	const [translations, setTranslations] = useState([])
	// Получение категорий
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

	// Получение продукта для всех языков
	const fetchProduct = async () => {
		try {
			const productTranslations = await Promise.all(
				LANGUAGES.map(async lang => {
					const response = await fetch(
						`${API_BASE_URL}/products/${id}?lang=${lang}`
					)
					if (!response.ok) {
						router.push(`/${locale}/admin/products`)
						throw new Error(`Ошибка при получении продукта (${lang})`)
					}
					const data = await response.json()
					return { ...data.translations[0], language: lang }
				})
			)

			setTranslations(productTranslations)
			setProductsCategoryId(productTranslations[0].productsCategoryId || '')
			setImages(productTranslations[0].images || [])
		} catch (error) {
			console.error('Ошибка при загрузке продукта:', error)
		}
	}

	const fetchProductImages = async () => {
		const response = await fetch(`${API_BASE_URL}/products/images/${id}`)
		const data = await response.json()
		setProductImages(data)
	}
	useEffect(() => {
		fetchCategories()
		fetchProduct()
		fetchProductImages()
	}, [id])

	const handleChangeTranslation = (lang, field, value) => {
		const updatedTranslations = translations.map(t =>
			t.language === lang ? { ...t, [field]: value } : t
		)
		setTranslations(updatedTranslations)
	}

	const handleFileChange = e => {
		const files = Array.from(e.target.files)
		setImages(files)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()

		formData.append('productsCategoryId', productsCategoryId)
		images.forEach(image => {
			formData.append('images', image) // Append each file
		})

		// Добавление переводов
		formData.append('translations', JSON.stringify(translations))

		// Добавление изображений

		try {
			const response = await fetch(`${API_BASE_URL}/products/${id}`, {
				method: 'PUT',
				body: formData,
			})

			if (!response.ok) throw new Error('Ошибка при обновлении продукта')

			router.push(`/${locale}/admin/products`)
		} catch (error) {
			console.error('Ошибка при обновлении продукта:', error)
		}
	}

	const handleDeleteProductImage = async id => {
		try {
			const response = await fetch(`${API_BASE_URL}/products/images/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Ошибка при удалении изображения')
			}

			const data = await response.json()
			fetchProductImages()
			// Здесь можно обновить состояние, если нужно, например, удалить изображение из списка
		} catch (error) {
			console.error('Ошибка при удалении изображения:', error)
		}
	}

	return (
		<div className='px-3 mx-auto container w-full text-white'>
			<form className='flex flex-col gap-5 py-5' onSubmit={handleSubmit}>
				<h2 className='text-3xl font-bold'>Изменение продукта</h2>

				<Select
					label='Выберите категорию'
					onChange={e => setProductsCategoryId(Number(e.target.value))}
					value={productsCategoryId}
					required
				>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.translations[0]?.name || 'Без названия'}
						</SelectItem>
					))}
				</Select>

				<input type='file' multiple onChange={handleFileChange} />

				<div className='grid grid-cols-2 gap-4'>
					{productImages.map(el => (
						<div className='relative'>
							<Image key={el.id} src={`${API_BASE_URL_PHOTO}/${el.image}`} />
							<FaTrash
								onClick={() => handleDeleteProductImage(el.id)}
								className='hover:text-red-500 z-10 cursor-pointer absolute right-5 top-5'
							/>
						</div>
					))}
				</div>
				{/* Отображение всех переводов */}
				<div className='grid grid-cols-1 gap-4'>
					{translations.map(t => (
						<div key={t.language} className='flex flex-col gap-2 p-3 rounded'>
							<h3 className='text-xl font-semibold'>
								{t.language.toUpperCase()}
							</h3>
							<Input
								type='text'
								placeholder={`MetaTitle (${t.language})`}
								value={t.metaTitle}
								onChange={e =>
									handleChangeTranslation(
										t.language,
										'metaTitle',
										e.target.value
									)
								}
								required
							/>
							<Input
								type='text'
								placeholder={`MetaDescription (${t.language})`}
								value={t.metaDescription}
								onChange={e =>
									handleChangeTranslation(
										t.language,
										'metaDescription',
										e.target.value
									)
								}
								required
							/>
							<Input
								type='text'
								placeholder={`MetaKeywords (${t.language})`}
								value={t.metaKeywords}
								onChange={e =>
									handleChangeTranslation(
										t.language,
										'metaKeywords',
										e.target.value
									)
								}
								required
							/>
							<Input
								type='text'
								placeholder={`Заголовок (${t.language})`}
								value={t.title}
								onChange={e =>
									handleChangeTranslation(t.language, 'title', e.target.value)
								}
								required
							/>
							<Input
								type='text'
								placeholder={`Подзаголовок (${t.language})`}
								value={t.subtitle}
								onChange={e =>
									handleChangeTranslation(
										t.language,
										'subtitle',
										e.target.value
									)
								}
							/>
							<CustomEditor
								value={t.description}
								fn={e => handleChangeTranslation(t.language, 'description', e)}
							/>
						</div>
					))}
				</div>

				<Button type='submit'>Изменить продукт</Button>
			</form>
		</div>
	)
}

export default ProductUpdateAdminPage
