import { API_BASE_URL } from '@/api/config'
import ProductPage from '@/pages/productPage'

export async function generateMetadata({ params }) {
	try {
		// Подключение к API для получения данных о продукте
		const response = await fetch(
			`${API_BASE_URL}/products/${params.productId}?lang=${params.locale}`
		)

		// Проверяем успешность ответа
		if (!response.ok) {
			throw new Error(`Failed to fetch product: ${response.statusText}`)
		}

		// Преобразуем ответ в JSON
		const data = await response.json()

		// Генерируем метаданные
		return {
			title: data?.translations[0].metaTitle || 'Default Title',
			description:
				data?.translations[0].metaDescription || 'Default Description',
			keywords: data?.translations[0].metaKeywords  || 'Default Keywords',
		}
	} catch (error) {
		console.error('Error fetching product data:', error)
		// Возвращаем значения по умолчанию при ошибке
		return {
			title: 'Product Not Found',
			description: 'The requested product was not found',
			keywords: '',
		}
	}
}

const Product = () => {
	return <ProductPage />
}

export default Product
