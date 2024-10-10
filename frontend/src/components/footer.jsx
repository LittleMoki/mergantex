import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/MerganteksLogo.png'

export const Footer = () => {
	return (
		<footer className='bg-blue-950 py-10'>
			<div className='container mx-auto px-3'>
				<div className='grid justify-items-center sm:grid-cols-3 grid-cols-1 sm:text-start text-center gap-4'>
					<Link href='/'>
						<Image
							placeholder='blur'
							blurDataURL={logo.blurDataURL}
							src={logo.src}
							width={logo.width}
							height={logo.height}
							alt='logo'
							className='object-contain'
						/>
					</Link>
					<ul className='text-white/65'>
						<h3 className='text-white/30 font-semibold pb-3'>Навигация</h3>
						<div className='flex flex-col gap-2'>
							<li>
								<Link href={'/'}>Главная</Link>
							</li>
							<li>
								<Link href={'/'}>О нас</Link>
							</li>
							<li>
								<Link href={'/'}>Производство</Link>
							</li>
							<li>
								<Link href={'/'}>Контакты</Link>
							</li>
						</div>
					</ul>
					<ul className='text-white/65'>
						<h3 className='text-white/30 font-semibold pb-3'>Контакты</h3>
						<div className='flex flex-col gap-2'>
							<li>
								200700, Узбекистан,
								<br /> Бухарская обл., Каганский район,
								<br /> Поселок «Туткунда»
							</li>
							<li>
								<a href='tel:+998971836644'>Тел: +998 97 183-66-44</a>
							</li>
							<li>
								<a href='mailto:info@promtextile.uz'>
									E-mail: info@promtextile.uz
								</a>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</footer>
	)
}
