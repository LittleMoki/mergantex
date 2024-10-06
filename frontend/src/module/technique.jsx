'use client'
import image from '@/public/HeroImage.jpg'
import Image from 'next/image'
import { useState } from 'react'

const Technique = () => {
	const [place, setPlace] = useState(false)

	const items = [
		{
			id: 1,
			image: image,
			title: 'Title 1',
		},
		{
			id: 2,
			image: image,
			title: 'Title 2',
		},
		{
			id: 3,
			image: image,
			title: 'Title 3',
		},
		{
			id: 4,
			image: image,
			title: 'Title 4',
		},
	]
	return (
		<div>
			<div className='grid container px-3 mx-auto py-10 gap-3 lg:grid-cols-2'>
				{items.map(el => (
					<div
						onMouseEnter={() => setPlace(el.id)}
						onMouseLeave={() => setPlace(false)}
						className='relative overflow-hidden'
					>
						<Image
							src={image.src}
							width={image.width}
							height={image.height}
							alt='place'
							blurDataURL={image.blurDataURL}
							placeholder='blur'
							className='rounded-lg brightness-50'
						/>
						<h2 className='absolute text-3xl top-3 left-3'>Title</h2>
						<div
							className={`absolute text-black overflow-x-auto transition-all left-0 bg-white h-[50%] w-full p-2 rounded-b-lg ${
								place == el.id ? 'bottom-0' : 'bottom-[-50%]'
							}`}
						>
							<h3>Title</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
								ipsa maxime blanditiis est! Possimus veniam ducimus, similique
								voluptatem, at adipisci eum quos neque nulla ipsum, iure ipsa
								modi exercitationem quis.
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Technique
