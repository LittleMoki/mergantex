import { CustomButton } from '@/ui/button'
import Image from 'next/image'
import HeroImage from '@/public/HeroImage.jpg'

const Hero = () => {
	return (
		<main className=''>
			<div className='flex justify-between gap-3 container px-3 mx-auto items-center py-10'>
				<div className='flex min-w-[340px] flex-col gap-3 items-start'>
					<h1 className='text-3xl font-bold text-[#07569a]'>
						Maqsadimiz har doim yuqori sifat.
					</h1>
					<p className='text-xl max-w-[500px]'>
						Biz bilan hamkorlik qilgan kompaniyalarni rivojlanish darajasi
						yuqori bo'lgan va har doim ularni qo'llab - quvvatlaymiz! Ularning
						rivoji - bizni quvontiradi.
					</p>
					<CustomButton>KO'PROQ</CustomButton>
				</div>
				<div className='max-w-[600px] max-h-[400px]'>
					<Image
						className='w-full h-full object-cover object-center rounded-xl'
						src={HeroImage.src}
						alt='heroImage'
						width={HeroImage.width}
						height={HeroImage.height}
						placeholder='blur'
						blurDataURL={HeroImage.blurDataURL}
					/>
				</div>
			</div>
		</main>
	)
}

export default Hero
