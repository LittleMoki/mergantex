'use client'
import { API_BASE_URL } from '@/api/config'
import CategoryForm from '@/module/categoryForm'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

const CategoryAdminPage = () => {
	const [categories, setCategories] = useState([])
	const { locale } = useParams()

	const fetchCategories = async () => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/categories?lang=${locale}`
			) // Убедись, что это правильный путь
			if (!response.ok) {
				throw new Error('Ошибка при получении категорий')
			}
			const data = await response.json()
			setCategories(data)
		} catch (error) {
			console.error('Ошибка при загрузке категорий:', error)
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	const deleteCategory = async id => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/categories/${id}`,
				{
					method: 'DELETE',
				}
			)

			if (!response.ok) {
				throw new Error('Ошибка при удалении категории')
			}

			// Успешное удаление, обновляем список категорий
			setCategories(prevCategories =>
				prevCategories.filter(category => category.id !== id)
			)
		} catch (error) {
			console.error('Ошибка при удалении категории:', error)
		}
	}

	

	return (
		<div className='container px-3 mx-auto'>
			<CategoryForm onCategoryCreated={fetchCategories} />
			{/* Здесь можешь отобразить список категорий */}
			<h3 className='text-white text-3xl font-bold pb-3'>Название категорий</h3>
			<ul className='flex gap-3'>
				{categories.map(category => (
					<li
						className='bg-white flex text-black justify-between items-center gap-4 rounded-lg py-3 px-3'
						key={category.id}
					>
						<p className='cursor-pointer'>{category.translations[0]?.name}</p>
						<Link href={`/${locale}/admin/categories/${category.id}`}>
							<FaPencil className='hover:text-blue-600 cursor-pointer' />
						</Link>
						<FaTrash
							onClick={() => deleteCategory(category.id)}
							className='hover:text-red-600 cursor-pointer'
						/>
					</li> // Отображение названия на основном языке
				))}
			</ul>
		</div>
	)
}

export default CategoryAdminPage
