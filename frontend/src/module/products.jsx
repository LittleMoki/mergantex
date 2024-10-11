'use client'
import image from '@/public/HeroImage.jpg'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'
const Products = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [id, setId] = useState(0)

	const items = [
		{
			id: 1,
			image: image,
			title: 'Title 1',
			subtitle: 'Subtitle 1',
		},
		{
			id: 2,
			image: image,
			title: 'Title 2',
			subtitle: 'Subtitle 2',
		},
		{
			id: 3,
			image: image,
			title: 'Title 3',
			subtitle: 'Subtitle 3',
		},
		{
			id: 4,
			image: image,
			title: 'Title 4',
			subtitle: 'Subtitle 4',
		},
	]
	return (
		<>
			<div id='products' className='flex flex-col gap-2 container px-3 py-10 mx-auto'>
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
					{items.map((el, id) => (
						<Image
							key={el.id}
							onClick={() => {
								onOpen()
								setId(id)
							}}
							src={el.image.src}
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
					className='text-white'
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
											src={items[id].image.src}
											width={350}
											height={350}
											alt='product'
											className='rounded-lg md:max-w-[350px] w-full'
										/>
										<div>
											<h1 className='text-3xl font-bold'>{items[id].title}</h1>
											<p className='text-lg'>{items[id].subtitle}</p>
										</div>
									</div>
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default Products
