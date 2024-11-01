import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const ProductDesc = ({ title, description }) => {
	const {locale} = useParams() || {}
	const section = useMemo(
		() => ({
			ru: { desc: 'Продукты' },
			en: { desc: 'Description' },
			uz: { desc: 'Tavsif' },
			cn: { desc: '描述' },
		}),
		[]
	)
	return (
		<div className='lg:text-right'>
			<h1 className='text-4xl font-bold'>{title}</h1>
			<div>
				<h4 className='text-xl font-bold'>{section[locale]?.desc}</h4>
				<div
					dangerouslySetInnerHTML={{
						__html: description,
					}}
				/>
			</div>
		</div>
	)
}

export default ProductDesc
