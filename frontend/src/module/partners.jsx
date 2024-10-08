import image from '@/public/partnerLogo.png'
import Image from 'next/image'

const Partners = () => {
	return (
		<div className='container px-3 gap-3 mx-auto grid lg:grid-cols-6 sm:grid-cols-3'>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt='partnerLogo'
			/>
		</div>
	)
}

export default Partners
