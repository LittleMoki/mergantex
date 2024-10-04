import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className='bg-blue-dark py-10'>
			<div className='container mx-auto '>
				<div className='grid justify-items-center sm:grid-cols-3 grid-cols-1 sm:text-start text-center gap-4'>
					<div>logo</div>
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
