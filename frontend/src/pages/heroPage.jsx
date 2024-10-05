import { CustomButton } from '@/ui/button'
import Image from 'next/image'
import HeroImage from '../public/HeroImage.jpg'

const HeroPage = () => {
	return (
		<main>
			<div>
				<h1>Maqsadimiz har doim yuqori sifat.</h1>
				<p>
					Biz bilan hamkorlik qilgan kompaniyalarni rivojlanish darajasi yuqori
					bo'lgan va har doim ularni qo'llab - quvvatlaymiz! Ularning rivoji -
					bizni quvontiradi.
				</p>
				<CustomButton>KO'PROQ</CustomButton>
			</div>
			<Image
				src={HeroImage.src}
				alt='heroImage'
				width={HeroImage.width}
				height={HeroImage.height}
				placeholder='blur'
				blurDataURL={HeroImage.blurDataURL}
			/>
		</main>
	)
}

export default HeroPage
