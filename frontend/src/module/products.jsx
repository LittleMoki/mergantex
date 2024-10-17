'use client'
import image from '@/public/HeroImage.jpg'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Products = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [id, setId] = useState(0)
	const { locale } = useParams()

	const [products, setProducts] = useState([])

	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products?lang=${locale}`
			)
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
		<>
			<div
				id='products'
				className='flex flex-col gap-2 container px-3 py-10 mx-auto'
			>
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
					{products.map((el, id) => (
						<Image
							key={el.id}
							onClick={() => {
								onOpen()
								setId(id)
							}}
							src={image.src}
							width={image.width}
							height={image.height}
							alt='product'
							blurDataURL={image.blurDataURL}
							placeholder='blur'
							className='rounded-lg cursor-pointer'
						/>
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
									Информация
								</ModalHeader>
								<ModalBody>
									<div className='flex md:flex-row flex-col gap-3 py-3'>
										<Image
											src={image.src}
											width={350}
											height={350}
											alt='product'
											className='rounded-lg md:max-w-[350px] w-full'
										/>
										<div>
											<h1 className='text-3xl font-bold'>
												{products[id]?.translations[0]?.title}
											</h1>
											<p className='text-lg'>
												{products[id]?.translations[0]?.subtitle}
											</p>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<Link
										className='w-full'
										href={`${locale}/categories/${products[id]?.id}`}
									>
										<Button className='w-full'>Click</Button>
									</Link>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default Products
