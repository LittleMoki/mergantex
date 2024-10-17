import image from '@/public/HeroImage.jpg'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ place, isButton = true, setPlace, title, subtitle,description, id }) => {
	return (
		<div
			onMouseEnter={() => setPlace(id)}
			onMouseLeave={() => setPlace(false)}
			className='relative overflow-hidden hover:shadow-xl rounded-lg'
		>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='place'
				blurDataURL={image.blurDataURL}
				placeholder='blur'
				className='rounded-lg brightness-75'
			/>
			<h2 className='absolute text-3xl top-3 left-3'>{title}</h2>
			<div
				className={`absolute text-black overflow-x-auto transition-all left-0 bg-white h-[50%] w-full p-2 rounded-b-lg flex flex-col justify-between ${
					place == id ? 'bottom-0' : 'bottom-[-50%]'
				}`}
			>
				<div>
					<h3 className='text-2xl'>{title}</h3>
					<p>{description}</p>
				</div>
				<Link className={`${isButton ? 'block' : 'hidden'}`} href={'/'}>
					<Button className='w-full'>Open</Button>
				</Link>
			</div>
		</div>
	)
}

export default Card
