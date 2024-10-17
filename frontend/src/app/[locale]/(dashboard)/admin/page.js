'use client'
import {
	Card,
	CardBody,
	Select,
	SelectItem,
	Tab,
	Tabs,
} from '@nextui-org/react'

import CategoryAdminPage from '@/module/categoryAdminPage'
import FactoryForm from '@/module/FactoryForm'
import ProductForm from '@/module/productForm'
import TechniqueForm from '@/module/techniqueForm'
import Lang from '@/ui/lang'

const Admin = () => {
	

	return (
		<div className='container mx-auto px-3 dark h-full min-h-screen'>
			<Lang/>
			
			<Tabs aria-label='Options'>
				<Tab key='категории' title='Категории'>
					<Card>
						<CardBody>
							<CategoryAdminPage />
						</CardBody>
					</Card>
				</Tab>
				<Tab key='продукты' title='Продукты'>
					<Card>
						<CardBody>
							<ProductForm />
						</CardBody>
					</Card>
				</Tab>
				<Tab key='фабрики' title='Фабрики'>
					<Card>
						<CardBody>
							<FactoryForm />
						</CardBody>
					</Card>
				</Tab>
				<Tab key='техники' title='Техники'>
					<Card>
						<CardBody>
							<TechniqueForm />
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	)
}

export default Admin
