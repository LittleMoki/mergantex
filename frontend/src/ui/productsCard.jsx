import imageBg from '@/public/HeroImage.jpg'
import productCardBg from '@/public/productsCardsBg.png'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const ProductsCard = ({ title, subtitle, id, image },props) => {
	const { locale } = useParams()
	
	return (
		<div className='w-full sm:max-h-[400px] my-2 overflow-hidden bg-black text-white relative rounded-lg'>
			<Link className='grid sm:grid-cols-2' href={`/${locale}/categories/${id}`}>
				<div className='px-[32px] gap-4 sm:max-h-[400px] py-[24px] flex flex-col justify-between'>
					<Image
						className='absolute top-0 left-0 bg-cover w-full h-full'
						src={productCardBg.src}
						width={1000}
						height={1000}
						alt='productCardBg'
					/>
					<div className='text-[12px]'>{subtitle}</div>
					<p className='sm:text-4xl text-2xl uppercase'>
						{title}
					</p>
					<Button className='w-full sm:block hidden'>Подробнее</Button>
				</div>
				<div>
					<Image
						src={imageBg.src}
						width={imageBg.width}
						height={imageBg.height}
						placeholder='blur'
						blurDataURL={imageBg.blurDataURL}
						className='w-full h-full max-h-[400px]'
					/>
				</div>
			</Link>
		</div>
	)
}

export default ProductsCard
