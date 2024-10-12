'use client'

import { Button, Input, Textarea } from '@nextui-org/react'
import { useMask } from '@react-input/mask'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const Contact = () => {
	const chatId = 5971164873
	const botFetchApi =
		'https://api.telegram.org/bot8110241013:AAEFwQtPgb3KDE5aVDfrIqmq1xJbwzdK9z8/sendMessage'

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
			phone: '',
			description: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, 'Name must be at least 2 characters')
				.required('Required'),
			surname: Yup.string()
				.min(2, 'Surname must be at least 2 characters')
				.required('Required'),
			phone: Yup.string()
				.required('Required')
				.test('isValidPhone', 'Phone must be at least 10 digits', value => {
					// Remove non-digit characters from the masked phone value
					const digitsOnly = value.replace(/\D/g, '')
					return digitsOnly.length === 12 // Adjust length based on your expected format
				}),
			description: Yup.string().required('Required'),
		}),
		onSubmit: (values, { resetForm }) => {
			const message = `Name: ${values.name}\nSurname: ${values.surname}\nPhone: ${values.phone}\nDescription: ${values.description}`

			fetch(botFetchApi, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
				}),
			})
				.then(response => response.json())
				.then(data => {
					if (data.ok) {
						console.log(`Сообщение отправлено в чат ${chatId}`)
					} else {
						console.error(`Ошибка отправки сообщения в чат ${chatId}`)
					}
					resetForm()
				})
				.catch(error => {
					console.error('Ошибка:', error)
				})
		},
	})

	const inputRef = useMask({
		mask: '+998 (__) ___-__-__',
		replacement: { _: /\d/ },
	})

	return (
		<div
			id='contact'
			className='container gap-3 py-10 px-3 mx-auto grid lg:grid-cols-2'
		>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
				<Input
					type='text'
					label='Name'
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errorMessage={
						formik.touched.name && formik.errors.name ? formik.errors.name : ''
					}
					isInvalid={
						formik.touched.name && formik.errors.name ? 'error' : 'default'
					}
				/>
				<Input
					type='text'
					label='Surname'
					name='surname'
					value={formik.values.surname}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errorMessage={
						formik.touched.surname && formik.errors.surname
							? formik.errors.surname
							: ''
					}
					isInvalid={
						formik.touched.surname && formik.errors.surname
							? 'error'
							: 'default'
					}
				/>
				<Input
					type='text'
					label='Phone'
					name='phone'
					ref={inputRef}
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errorMessage={
						formik.touched.phone && formik.errors.phone
							? formik.errors.phone
							: ''
					}
					isInvalid={
						formik.touched.phone && formik.errors.phone ? 'error' : 'default'
					}
				/>
				<Textarea
					label='Description'
					placeholder='Enter your description'
					className='w-full h-full'
					name='description'
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errorMessage={
						formik.touched.description && formik.errors.description
							? formik.errors.description
							: ''
					}
					isInvalid={
						formik.touched.description && formik.errors.description
							? 'error'
							: 'default'
					}
				/>
				<Button type='submit' className='py-6'>
					Submit
				</Button>
			</form>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1533.2833117321452!2d64.43295521634188!3d39.77183769356219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500546a5bff151%3A0x607d3e6bb3ea0419!2sMerganteks%20Bukhara!5e0!3m2!1sru!2s!4v1675426927670!5m2!1sru!2s'
				loading='lazy'
				className='maw-w-[600px] w-full h-full min-h-[300px] max-h-[450px]'
				referrerpolicy='no-referrer-when-downgrade'
			></iframe>
		</div>
	)
}

export default Contact
