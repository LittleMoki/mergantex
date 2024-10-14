'use client'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

import CategoryAdminPage from '@/module/categoryAdminPage'
import ProductForm from '@/module/productForm'

const Admin = () => {
	return (
		<div className='container mx-auto px-3 dark h-full min-h-screen'>
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
			</Tabs>
		</div>
	)
}

export default Admin
