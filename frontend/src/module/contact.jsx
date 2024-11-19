'use client'

import TextMotion from '@/ui/textMotion'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

const Contact = () => {
	const { locale } = useParams() || {}

	// Массив chatId для отправки сообщений в несколько чатов
	const chatIds = [5971164873, 1048863760] // Добавьте сюда дополнительные chatId
	const botFetchApi =
		'https://api.telegram.org/bot8110241013:AAEFwQtPgb3KDE5aVDfrIqmq1xJbwzdK9z8/sendMessage'

	const [phone, setPhone] = useState('') // Для хранения номера телефона

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
			company: '',
			email: '',
			description: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, 'Name must be at least 2 characters')
				.required('Required'),
			surname: Yup.string()
				.min(2, 'Surname must be at least 2 characters')
				.required('Required'),
			company: Yup.string()
				.min(2, 'Company name must be at least 2 characters')
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			description: Yup.string().required('Required'),
		}),
		onSubmit: (values, { resetForm }) => {
			if (phone.replace(/\D/g, '').length < 10) {
				toast.error(section[locale]?.invalidPhone, { position: 'bottom-right' })
				return
			}

			const message = `Name: ${values.name}\nSurname: ${values.surname}\nCompany: ${values.company}\nEmail: ${values.email}\nPhone: +${phone}\nDescription: ${values.description}`

			// Перебор массива chatIds и отправка сообщений в каждый чат
			chatIds.forEach(chatId => {
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
						resetForm()
						setPhone('') // Сброс номера телефона
						toast.success(section[locale]?.successMessage, {
							position: 'bottom-right',
							autoClose: 3000,
						})
					})
					.catch(error => {
						console.error('Error:', error)
						toast.error(section[locale]?.errorMessage, {
							position: 'bottom-right',
							autoClose: 3000,
						})
					})
			})
		},
	})

	const section = useMemo(
		() => ({
			ru: {
				contact: 'Контакт',
				name: 'Имя',
				surname: 'Фамилия',
				company: 'Название компании',
				email: 'Электронная почта',
				phone: 'Телефон',
				description: 'Описание',
				sendBtn: 'Отправить',
				invalidPhone: 'Некорректный номер телефона',
				successMessage: 'Ваше сообщение успешно отправлено!',
				errorMessage: 'Ошибка отправки. Попробуйте ещё раз.',
				companyError: 'Название компании должно содержать минимум 2 символа',
			},
			en: {
				contact: 'Contact',
				name: 'Name',
				surname: 'Surname',
				company: 'Company Name',
				email: 'Email',
				phone: 'Phone',
				description: 'Description',
				sendBtn: 'Send',
				invalidPhone: 'Invalid phone number',
				successMessage: 'Your message was successfully sent!',
				errorMessage: 'Failed to send your message. Please try again.',
				companyError: 'Company name must be at least 2 characters',
			},
			uz: {
				contact: 'Aloqa',
				name: 'Ism',
				surname: 'Familiya',
				company: 'Kompaniya nomi',
				email: 'Email',
				phone: 'Telefon',
				description: 'Tavsif',
				sendBtn: 'Yuborish',
				invalidPhone: 'Noto‘g‘ri telefon raqami',
				successMessage: 'Xabaringiz muvaffaqiyatli yuborildi!',
				errorMessage:
					'Xabarni yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.',
				companyError: 'Kompaniya nomi kamida 2 ta belgi bo‘lishi kerak',
			},
			cn: {
				contact: '联系方式',
				name: '名字',
				surname: '姓氏',
				company: '公司名称',
				email: '电子邮件',
				phone: '电话',
				description: '描述',
				sendBtn: '发送',
				invalidPhone: '无效的电话号码',
				successMessage: '您的消息已成功发送！',
				errorMessage: '发送失败，请重试。',
				companyError: '公司名称至少需要2个字符',
			},
		}),
		[]
	)

	return (
		<TextMotion>
			<ToastContainer position='bottom-right' />

			<div className='container px-3 mx-auto'>
				<h3 className='text-3xl py-4 text-center'>
					{section[locale]?.contact}
				</h3>
				<div className='gap-3 py-10 grid lg:grid-cols-2'>
					<form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
						<Input
							type='text'
							label={section[locale]?.name}
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMessage={
								formik.touched.name && formik.errors.name
									? formik.errors.name
									: ''
							}
							isInvalid={
								formik.touched.name && formik.errors.name ? 'error' : 'default'
							}
						/>
						<Input
							type='text'
							label={section[locale]?.surname}
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
							label={section[locale]?.company}
							name='company'
							value={formik.values.company}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMessage={
								formik.touched.company && formik.errors.company
									? section[locale]?.companyError
									: ''
							}
							isInvalid={
								formik.touched.company && formik.errors.company
									? 'error'
									: 'default'
							}
						/>
						<Input
							type='text'
							label={section[locale]?.email}
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMessage={
								formik.touched.email && formik.errors.email
									? formik.errors.email
									: ''
							}
							isInvalid={
								formik.touched.email && formik.errors.email
									? 'error'
									: 'default'
							}
						/>
						<div>
							<label>{section[locale]?.phone}</label>
							<PhoneInput
								country={'us'}
								value={phone}
								onChange={setPhone}
								inputProps={{
									name: 'phone',
									required: true,
								}}
								containerClass='w-full'
								inputClass='w-full border rounded p-2'
							/>
						</div>
						<Textarea
							label={section[locale]?.description}
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
						<Button
							type='submit'
							disabled={!formik.isValid}
							className='w-full px-4 py-6 mt-1'
						>
							{section[locale]?.sendBtn}
						</Button>
					</form>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1533.2833117321452!2d64.43295521634188!3d39.77183769356219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500546a5bff151%3A0x607d3e6bb3ea0419!2sMerganteks%20Bukhara!5e0!3m2!1sru!2s!4v1675426927670!5m2!1sru!2s'
						loading='lazy'
						className='maw-w-[600px] w-full h-full min-h-[300px] max-h-[450px]'
					></iframe>
				</div>
			</div>
		</TextMotion>
	)
}

export default Contact
