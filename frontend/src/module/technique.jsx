'use client'
import image from '@/public/HeroImage.jpg'
import Card from '@/ui/card'
import { useState } from 'react'

const Technique = () => {
	const [place, setPlace] = useState(false)

	const items = [
		{
			id: 1,
			image: image,
			title: 'Title 1',
			subtitle:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem esse molestias consequatur quo totam doloremque, necessitatibus ducimus, accusantium deleniti facere veniam veritatis quae aliquid voluptas, sit consectetur! Inventore, amet saepe!',
		},
		{
			id: 2,
			image: image,
			title: 'Title 2',
			subtitle:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem esse molestias consequatur quo totam doloremque, necessitatibus ducimus, accusantium deleniti facere veniam veritatis quae aliquid voluptas, sit consectetur! Inventore, amet saepe!',
		},
		{
			id: 3,
			image: image,
			title: 'Title 3',
			subtitle:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem esse molestias consequatur quo totam doloremque, necessitatibus ducimus, accusantium deleniti facere veniam veritatis quae aliquid voluptas, sit consectetur! Inventore, amet saepe!',
		},
		{
			id: 4,
			image: image,
			title: 'Title 4',
			subtitle:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem esse molestias consequatur quo totam doloremque, necessitatibus ducimus, accusantium deleniti facere veniam veritatis quae aliquid voluptas, sit consectetur! Inventore, amet saepe!',
		},
	]
	return (
		<div
			id='technique'
			className='grid text-white container px-3 mx-auto py-10 gap-3 lg:grid-cols-2'
		>
			{items.map(el => (
				<Card {...el} place={place} setPlace={setPlace} />
			))}
		</div>
	)
}

export default Technique
