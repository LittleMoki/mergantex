'use client'
import Lang from '@/ui/lang'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const HeaderAdmin = () => {
	const { locale } = useParams()
	return (
		<header className='container py-5 px-3 mx-auto text-white flex gap-4 font-bold'>
			<Link href={`/${locale}/admin/categories`}>Категории</Link>
			<Link href={`/${locale}/admin/products`}>Продукты</Link>
			<Link href={`/${locale}/admin/factories`}>Фабрики</Link>
			<Link href={`/${locale}/admin/techniques`}>Техники</Link>
			<Link href={`/${locale}/admin/video`}>Видео на главном</Link>
			<Lang/>
		</header>
	)
}

export default HeaderAdmin
