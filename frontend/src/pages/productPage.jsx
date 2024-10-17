'use client'
import ProductDesc from '@/module/productDesc'
import ProductSwiper from '@/module/productSwiper'
import { useParams } from 'next/navigation'
import { useEffect, useState 	} from 'react'
import { useMediaQuery } from 'react-responsive'

const ProductPage = () => {
	const [product, setProducts] = useState([])
	const params = useParams()
	const locale = params.locale || 'en'
	const productId = params.productId || '0'
	// console.log(product)
	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products/${productId}?lang=${locale}`
			)
			if (!response.ok) throw new Error('Ошибка при получении продуктов')

			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	const isSize = useMediaQuery({ minWidth: 950 }) // true если ширина >= 950px

	console.log(product)
	return (
		<div className='container py-10 px-3 mx-auto'>
			<div className={`grid gap-4  ${isSize ? 'grid-cols-2' : 'grid-cols-1'}`}>
				<ProductSwiper />

			<ProductDesc {...product?.translations?.[0]} />
			</div>
		</div>
	)
}

export default ProductPage
