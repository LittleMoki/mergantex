"use client";

import { Button, Input, Textarea } from '@nextui-org/react';

const Contact = () => {
	const chatId = 1048863760;
	const message = 'Hello World';
	const botFetchApi =
		'https://api.telegram.org/bot8110241013:AAEFwQtPgb3KDE5aVDfrIqmq1xJbwzdK9z8/sendMessage';

	const postData = e => {
		e.preventDefault();
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
					console.log(`Сообщение отправлено в чат ${chatId}`);
				} else {
					console.error(`Ошибка отправки сообщения в чат ${chatId}`);
				}
			})
			.catch(error => {
				console.error('Ошибка:', error);
			});
	};

	return (
		<div
			id='contact'
			className='container gap-3 py-10 px-3 mx-auto grid lg:grid-cols-2'
		>
			<form onSubmit={postData} className='flex flex-col gap-3'>
				<Input type='text' label='Name' />
				<Input type='text' label='Surname' />
				<Input type='text' label='Phone' />
				<Input type='text' label='Text' />
				<Textarea
					label='Description'
					placeholder='Enter your description'
					className='w-full h-full'
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
	);
};

export default Contact;
