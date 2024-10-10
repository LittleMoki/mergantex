import image from '@/public/cott.png'
import Image from 'next/image'
const Statistic = () => {
	const items = [
		{
			image: image,
			title: 'Title',
		},
		{
			image: image,
			title: 'Title',
		},
		{
			image: image,
			title: 'Title',
		},
		{
			image: image,
			title: 'Title',
		},
	]
	return (
			<div className='container grid md:grid-cols-4 sm:grid-cols-2 py-10 gap-5 px-3 mx-auto text-black'>
				{items.map(el => (
					<div className='flex flex-col items-center'>
						<Image src={image.src} width={70} height={70} alt='statistic' />
						<p>25000 t / yil</p>
					</div>
				))}
			</div>
	)
}

export default Statistic
