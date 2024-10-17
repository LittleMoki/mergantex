const ProductDesc = ({ title, description }) => {
	return (
		<div className='lg:text-right'>
			<h1 className='text-4xl font-bold'>{title}</h1>
			<div>
				<h4 className='text-xl font-bold'>Описание</h4>
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
