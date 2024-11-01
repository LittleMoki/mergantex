'use client'
import { API_BASE_URL, API_BASE_URL_PHOTO } from '@/api/config'
import CardMotion from '@/ui/cardMotion'
import TextMotion from '@/ui/textMotion'
import {
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
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
			const response = await fetch(`${API_BASE_URL}/products?lang=${locale}`)
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

	const selectedProduct = products.find(product => product.id === selectedId)

	return (
		<div
			id='products'
			className='flex flex-col gap-2 container px-3 py-10 mx-auto'
		>
			<TextMotion>
				<h3 className='text-3xl py-4 text-center'>{title}</h3>
			</TextMotion>
			<div className='grid sm:max-h-[400px] lg:grid-cols-4 sm:grid-cols-2 gap-3'>
				{products.slice(-4).map((el, id) => (
					<CardMotion index={id} key={el.id}>
						<Image
							onClick={() => handleOpen(el.id)}
							src={`${API_BASE_URL_PHOTO}/${el.images[0]?.image.split(',')[0]}`}
							alt='product'
							className='rounded-lg w-full h-full max-h-[400px] object-cover bg-cover cursor-pointer'
						/>
					</CardMotion>
				))}
			</div>

			<Modal
				size='3xl'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior='inside'
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								{section[locale]?.inf}
							</ModalHeader>
							<ModalBody>
								{selectedProduct ? (
									<div className='flex md:flex-row flex-col gap-3 py-3'>
										<Image
											src={`${API_BASE_URL_PHOTO}/${
												selectedProduct.images[0].image.split(',')[0]
											}`}
											width={350}
											height={350}
											alt='product'
											className='rounded-lg md:max-w-[350px] w-full'
										/>
										<div>
											<h1 className='text-3xl font-bold'>
												{selectedProduct.translations[0]?.title}
											</h1>
											<p className='text-lg'>
												{selectedProduct.translations[0]?.subtitle}
											</p>
										</div>
									</div>
								) : (
									<p>Загрузка информации о продукте...</p>
								)}
							</ModalBody>
							<ModalFooter>
								<Link
									className='w-full bg-gray-400 text-center py-3 rounded-lg text-white text-xl'
									href={`${locale}/categories/${selectedProduct?.id}`}
								>
									Open
								</Link>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default Products
