import { API_BASE_URL_PHOTO } from '@/api/config'
import { Button, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const Card = ({
	place,
	isButton = true,
	setPlace,
	title,
	image,
	description,
	isName = false,
	name,
	id,
	index
}) => {
	const { locale } = useParams() || {}
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			onMouseEnter={() => setPlace(id)}
			onMouseLeave={() => setPlace(false)}
			className='relative w-full overflow-hidden hover:shadow-xl rounded-lg'
		>
			<Image
				width={780}
				height={400}
				src={`${API_BASE_URL_PHOTO}/${image}`}
				alt='place'
				className='rounded-lg brightness-75 w-full max-h-[400px] z-[-1]'
			/>
			<h2 className='absolute text-3xl top-3 left-3 text-white'>{title}</h2>
			<div
				className={`absolute text-black overflow-x-auto transition-all left-0 bg-white h-[50%] w-full z-10 p-2 rounded-b-lg flex flex-col justify-between ${
					place == id ? 'bottom-0' : 'bottom-[-50%]'
				}`}
			>
				<div>
					<h3 className='text-2xl'>{title}</h3>
					<p className='py-2'>{description}</p>
					{isName ? <p>{name}</p> : <p>{description}</p>}
				</div>
				<Link
					className={`${isButton ? 'block' : 'hidden'}`}
					href={`/${locale}/technique`}
				>
					<Button className='w-full'>Open</Button>
				</Link>
			</div>
		</motion.div>
	)
}

export default Card
