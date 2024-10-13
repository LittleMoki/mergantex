'use client'
import ProductsCard from '@/ui/productsCard'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useMediaQuery } from 'react-responsive'

const ProductsTabs = () => {
	const isVertical = useMediaQuery({ minWidth: 950 }) // true если ширина >= 950px

	return (
		<Tabs
			className=' max-[950px]:w-full'
			isVertical={isVertical}
			aria-label='Options'
		>
			<Tab
				className='w-full'
				key='Пряжа хлопчатобумажная'
				title='Пряжа хлопчатобумажная'
			>
				<Card>
					<CardBody>
						<ProductsCard />
						<ProductsCard />
					</CardBody>
				</Card>
			</Tab>
			<Tab
				className='w-full'
				key='Трикотажные полотна'
				title='Трикотажные полотна'
			>
				<Card>
					<CardBody>
						<ProductsCard />
					</CardBody>
				</Card>
			</Tab>
			<Tab
				className='w-full'
				key='Ткань хлопчатобумажная'
				title='Ткань хлопчатобумажная'
			>
				<Card>
					<CardBody>
						<ProductsCard />
					</CardBody>
				</Card>
			</Tab>
			<Tab
				className='w-full'
				key='Трикотажные изделия'
				title='Трикотажные изделия'
			>
				<Card>
					<CardBody>
						<ProductsCard />
					</CardBody>
				</Card>
			</Tab>
		</Tabs>
	)
}

export default ProductsTabs
