'use client'
import { API_BASE_URL } from '@/api/config'
import ProductDesc from '@/module/productDesc'
import ProductSwiper from '@/module/productSwiper'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductPage = () => {
	const [product, setProducts] = useState([])
	const params = useParams() || {}
	const locale = params.locale || 'en'
	const productId = params.productId || '0'
	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/products/${productId}?lang=${locale}`
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

	return (
		<div className='container py-10 px-3 mx-auto'>
			<div className={`grid gap-4  grid-cols-2 max-[1024px]:grid-cols-1`}>
				<ProductSwiper id={productId} />

				<ProductDesc {...product?.translations?.[0]} />
			</div>
		</div>
	)
}

export default ProductPage
