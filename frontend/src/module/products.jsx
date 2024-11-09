'use client'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'
import TextMotion from '@/ui/textMotion'
import {
	Card,
	CardBody,
	CardFooter,
	Image,
	useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const Products = () => {
	const { locale } = useParams() || {}

	const section = useMemo(
		() => ({
			ru: { products: 'Продукты', inf: 'Информация' },
			en: { products: 'Products', inf: 'Information' },
			uz: { products: 'Mahsulotlar', inf: "Ma'lumot" },
			cn: { products: '产品', inf: '信息' },
		}),
		[]
	)
	// Выбираем заголовок в зависимости от locale
	const title = section[locale]?.products || 'Products'

	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectedId, setSelectedId] = useState(null)

	const [products, setProducts] = useState([])

	const fetchProducts = async () => {
		if (!locale) return // Проверяем наличие locale
		try {
			const response = await fetch(`${API_BASE_URL}/categories?lang=${locale}`)
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [locale]) // Обновляем данные при изменении locale

	const handleOpen = id => {
		setSelectedId(id)
		onOpen()
	}

	return (
		<div
			id='products'
			className='flex flex-col gap-2 container px-3 py-10 mx-auto'
		>
			<TextMotion>
				<h3 className='text-3xl py-4 text-center'>{title}</h3>
			</TextMotion>
			<div className='grid sm:max-h-[400px] lg:grid-cols-4 sm:grid-cols-2 gap-3'>
				{products?.slice(-4)?.map(el => (
					<Link key={el.id} href={`/${locale}/categories?name=${el.id}`}>
						<Card>
							<CardBody className='overflow-visible py-2'>
								<Image
									alt='Card background'
									className='object-cover rounded-xl'
									src={`${API_BASE_URL_PHOTO}/${el?.image}`}
								/>
							</CardBody>
							<CardFooter className='py-2 px-4 flex-col items-start'>
								<h4 className='font-bold text-large'>
									{el?.translations[0]?.name}
								</h4>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Products
