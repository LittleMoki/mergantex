import { Button, Input, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaRegPenToSquare } from 'react-icons/fa6'

const FactoryForm = () => {
	const [factories, setFactories] = useState([])
	const [form, setForm] = useState({
		name: '',
		translations: [
			{ language: 'uz', title: '', description: '' },
			{ language: 'ru', title: '', description: '' },
			{ language: 'en', title: '', description: '' },
		],
	})
	const [editing, setEditing] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const fetchFactories = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/factories')
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

	const handleChange = e => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleTranslationChange = (index, e) => {
		const { name, value } = e.target
		const newTranslations = [...form.translations]
		newTranslations[index][name] = value
		setForm(prev => ({ ...prev, translations: newTranslations }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setErrorMessage('')
		const method = editing ? 'PUT' : 'POST'
		const url = editing
			? `http://localhost:3000/api/factories/${editing}`
			: 'http://localhost:3000/api/factories'

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			if (!response.ok) throw new Error('Ошибка при отправке данных')
			await fetchFactories()
			resetForm()
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		setForm({
			name: '',
			translations: [
				{ language: 'uz', title: '', description: '' },
				{ language: 'ru', title: '', description: '' },
				{ language: 'en', title: '', description: '' },
			],
		})
		setEditing(null)
	}

	const handleEdit = factory => {
		setForm({
			name: factory.name,
			translations: factory.translations.map(trans => ({
				language: trans.language,
				title: trans.title,
				description: trans.description,
			})),
		})
		setEditing(factory.id)
	}

	const handleDelete = async id => {
		setLoading(true)
		try {
			await fetch(`http://localhost:3000/api/factories/${id}`, {
				method: 'DELETE',
			})
			await fetchFactories()
		} catch (error) {
			console.error(error)
			setErrorMessage('Ошибка при удалении фабрики')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Управление Фабриками</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='name'
					placeholder='Имя фабрики'
					value={form.name}
					onChange={handleChange}
					required
				/>
				{form.translations.map((trans, index) => (
					<div className='flex flex-col gap-3' key={trans.language}>
						<h3>Перевод на {trans.language}</h3>
						<Input
							type='text'
							name='title'
							placeholder='Название'
							value={trans.title}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
						<Textarea
							name='description'
							placeholder='Описание'
							value={trans.description}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
					</div>
				))}
				<Button type='submit' disabled={loading}>
					{loading ? 'Загрузка...' : editing ? 'Обновить' : 'Создать'}
				</Button>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			</form>

			<h2>Список Фабрик</h2>
			<ul className='flex flex-wrap'>
				{factories.map(factory => (
					<li
						className='bg-white flex gap-3 p-3 rounded-lg text-black'
						key={factory.id}
					>
						<h3>{factory.name}</h3>
						<div className='flex items-center gap-4'>
							<FaRegPenToSquare
								className='cursor-pointer'
								onClick={() => handleEdit(factory)}
							/>
							<FaTrash
									className='cursor-pointer hover:text-red-500'
								onClick={() => handleDelete(factory.id)}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FactoryForm
