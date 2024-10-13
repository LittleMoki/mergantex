'use client'
import ProductDesc from '@/module/productDesc'
import ProductSwiper from '@/module/productSwiper'
import { useMediaQuery } from 'react-responsive'

const ProductPage = () => {
	const isSize = useMediaQuery({ minWidth: 1024 }) // true если ширина >= 950px
	return (
		<div className='container py-10 px-3 mx-auto'>
			<div className={`grid gap-4  ${isSize ? 'grid-cols-2' : 'grid-cols-1'}`}>
				<ProductSwiper />

				<ProductDesc />
			</div>
		</div>
	)
}

export default ProductPage
