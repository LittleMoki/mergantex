import { API_BASE_URL_PHOTO } from '@/api/config'
import imageBg from '@/public/HeroImage.jpg'
import productCardBg from '@/public/productsCardsBg.png'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const ProductsCard = ({ title, subtitle, id, image }) => {
	const { locale } = useParams() || {}
	
	return (
		<div className='w-full h-full sm:max-h-[400px] my-2 overflow-hidden bg-blue-900 text-white relative rounded-lg'>
			<Link
				className='grid h-full sm:grid-cols-2'
				href={`/${locale}/categories/${id}`}
			>
				<div className='px-[32px] h-full gap-4 sm:max-h-[400px] py-[24px] flex flex-col justify-between'>
					<img
						className='absolute top-0 left-0 z-[2] bg-cover w-full h-full'
						src={productCardBg.src}
						width={1000}
						height={1000}
						alt='productCardBg'
					/>
					<div className='text-[12px]'>{subtitle}</div>
					<p className='sm:text-4xl text-2xl uppercase'>{title}</p>
					<div></div>
				</div>
				<div className='h-full sm:min-h-[400px] max-h-[400px]'>
					<Image
						src={`${API_BASE_URL_PHOTO}/${image}`}
						width={1000}
						height={1000}
						placeholder='blur'
						alt='product'
						className='w-full h-full  z-[1] relative object-cover object-center'
					/>
				</div>
			</Link>
		</div>
	)
}

export default ProductsCard
