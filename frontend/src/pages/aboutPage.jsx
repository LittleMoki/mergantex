import image from '@/public/HeroImage.jpg'
import Image from 'next/image'

const AboutPage = () => {
	return (
		<div>
			<div className='relative'>
				<Image
					src={image.src}
					width={image.width}
					height={image.height}
					placeholder='blur'
					blurDataURL={image.blurDataURL}
					className='w-full h-[calc(100vh-64px)] object-cover'
				/>
				<div className='absolute w-full backdrop-blur-lg bottom-0 left-0 text-white'>
					<h1 className='text-4xl container px-3 mx-auto py-10 font-bold'>
						Информация о "MERGRANTEKS"
					</h1>
				</div>
			</div>
			<div className='container px-3 mx-auto'>
				{/* Info text */}
				<div className='grid lg:grid-cols-3 gap-5 py-10'>
					<div className='lg:col-span-1'>
						<h2 className='text-3xl font-bold pb-4'>
							Добро пожаловать в "MERGRANTEKS" - полностью вертикально
							интегрированную текстильную компанию.
						</h2>
						<p>
							Специализирующуюся на производстве высококачественной продукции и
							имеющую надежную репутацию. Мы придерживаемся концепции "Экономики
							хлопкового кластера", которая заключается в ответственном
							выращивании хлопка и глубокой переработке его компонентов
						</p>
					</div>
					<p className='lg:col-span-2'>
						Мы - инновационная компания, основанная в 2018 году двумя
						предприимчивыми братьями в прекрасном городе Бухара. Наша страсть к
						текстилю и стремление к качеству стали движущей силой нашего успеха.
						Мы гордимся тем, что предлагаем полностью интегрированное
						производство хлопка и текстиля, начиная с выращивания
						высококачественного хлопка до конечных товаров. Наша компания
						является одним из ведущих хлопкоперерабатывающих "кластеров" в
						Бухарской области, объединяющих различные этапы производства и
						снабжения в текстильной промышленности. Мы с удовольствием
						предлагаем широкий спектр продукции, включающий хлопковые волокна,
						высококачественные ткани, модные текстильные изделия и оригинальную
						одежду. Наша команда талантливых дизайнеров и опытных
						производственных специалистов работает с усердием и творческим
						подходом, чтобы создавать продукты, отвечающие самым высоким
						стандартам качества и стиля. Мы гордимся нашей ответственностью по
						отношению к окружающей среде и прилагаем все усилия для снижения
						негативного влияния нашей деятельности на экологию. Мы активно
						применяем инновационные методы и технологии в процессе производства,
						чтобы сократить отходы и повысить эффективность использования
						ресурсов. Наша цель - быть вашим надежным партнером в области хлопка
						и текстиля. Мы стремимся удовлетворить потребности наших клиентов,
						предоставляя высококачественные продукты, конкурентные цены и
						надежные поставки.
					</p>
				</div>
				{/* Youtube */}
				<div className='grid lg:grid-cols-2 lg:grid-rows-[400px] grid-rows-[repeat(2,400px)] py-10 gap-3'>
					<iframe
						className='w-full h-full rounded-lg'
						src='https://www.youtube.com/embed/fDPqDPtsvX4'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen='allowfullscreen'
					></iframe>
					<iframe
						className='w-full h-full rounded-lg'
						src='https://www.youtube.com/embed/fDPqDPtsvX4'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen='allowfullscreen'
					></iframe>
				</div>
				{/* Statistic */}
				<div className='grid gap-5 py-10 lg:grid-cols-5 sm:grid-cols-3 place-content-center sm:text-start text-center'>
					<div>
						<p className='text-[12px]'>ХЛОПОК</p>
						<span className='text-6xl font-medium'>40,000</span>
						<p className='text-[18px] font-medium'>Тонн в год</p>
					</div>
					<div>
						<p className='text-[12px]'>ПРЯЖА</p>
						<span className='text-6xl font-medium'>9,400</span>
						<p className='text-[18px] font-medium'>Тонн в год</p>
					</div>
					<div>
						<p className='text-[12px]'>ТРИКОТАЖНОЕ ПОЛОТНО</p>
						<span className='text-6xl font-medium'>8,400</span>
						<p className='text-[18px] font-medium'>Тонн в год</p>
					</div>
					<div>
						<p className='text-[12px]'>ТКАЦКАЯ ТКАНЬ</p>
						<span className='text-6xl font-medium'>4</span>
						<p className='text-[18px] font-medium'>Миллион штук</p>
					</div>
					<div>
						<p className='text-[12px]'>ГОТОВАЯ ПРОДУКЦИЯ</p>
						<span className='text-6xl font-medium'>7</span>
						<p className='text-[18px] font-medium'>Миллион штук</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutPage
