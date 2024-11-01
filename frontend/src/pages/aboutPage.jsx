'use client'
import image from '@/public/HeroImage.jpg'
import CardMotion from '@/ui/cardMotion'
import TextMotion from '@/ui/textMotion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
const AboutPage = () => {
	const { locale } = useParams() || {}
	const aboutPage = useMemo(
		() => ({
			en: {
				mainTitle: "Information about 'MERGRANTEKS'",
				title:
					"Welcome to 'MERGRANTEKS' - a fully vertically integrated textile company.",
				paragraph1:
					"Specializing in the production of high-quality products and having a reliable reputation. We adhere to the concept of 'Cotton Cluster Economy,' which involves the responsible cultivation of cotton and the deep processing of its components.",
				paragraph2:
					"We are an innovative company founded in 2018 by two enterprising brothers in the beautiful city of Bukhara. Our passion for textiles and commitment to quality have been the driving forces behind our success. We take pride in offering fully integrated cotton and textile production, from growing high-quality cotton to the final products. Our company is one of the leading cotton processing 'clusters' in the Bukhara region, uniting various stages of production and supply in the textile industry. We are pleased to offer a wide range of products, including cotton fibers, high-quality fabrics, fashionable textile goods, and original clothing. Our team of talented designers and experienced production specialists works diligently and creatively to create products that meet the highest standards of quality and style. We are proud of our commitment to environmental responsibility and strive to minimize the negative impact of our activities on ecology. We actively apply innovative methods and technologies in our production processes to reduce waste and improve resource efficiency. Our goal is to be your reliable partner in cotton and textiles. We aim to meet our clients' needs by providing high-quality products, competitive prices, and reliable delivery.",
				cotton: 'COTTON',
				tons: 'Tons per year',
				yarn: 'YARN',
				fabric: 'KNITTED FABRIC',
				woven: 'WOVEN FABRIC',
				pieces: 'Million pieces',
				product: 'FINISHED PRODUCTS',
			},
			uz: {
				mainTitle: "'MERGRANTEKS' haqida ma'lumot",
				title:
					"'MERGRANTEKS' ga xush kelibsiz - to'liq vertikal integratsiyalangan tekstil kompaniyasi.",
				paragraph1:
					"Yuqaridagi sifatli mahsulotlar ishlab chiqarishga ixtisoslashgan va ishonchli obro'ga ega. Biz 'Paxta klaster iqtisodiyoti' konsepsiyasini amal qilamiz, bu paxtani mas'uliyat bilan yetishtirish va uning tarkibiy qismlarini chuqur qayta ishlashni o'z ichiga oladi.",
				paragraph2:
					"Biz 2018 yilda go'zal Buxoro shahrida ikki tadbirkor birodar tomonidan asoslangan innovatsion kompaniyamiz. Tekstillarga bo'lgan ishtiyoqimiz va sifatga bo'lgan e'tiborimiz muvaffaqiyatimizning harakatlantiruvchi kuchi bo'lib kelgan. Biz yuqori sifatli paxta yetishtirishdan tayyor mahsulotlargacha to'liq integratsiyalangan paxta va tekstil ishlab chiqarishni taklif etishdan faxrlanamiz. Kompaniyamiz Buxoro viloyatidagi yetakchi paxta qayta ishlash 'klasterlaridan' biri bo'lib, tekstil sanoatidagi ishlab chiqarish va yetkazib berishning turli bosqichlarini birlashtiradi. Biz paxta tolalari, yuqori sifatli to'qimalar, zamonaviy tekstil mahsulotlari va original kiyimlarni o'z ichiga olgan keng turdagi mahsulotlarni taklif etishga xursandmiz. Bizning iste'dodli dizaynerlar va tajribali ishlab chiqarish mutaxassislari jamoasi eng yuqori sifat va uslub standartlariga javob beradigan mahsulotlarni yaratish uchun mehnat qilishmoqda. Biz ekologik mas'uliyatga bo'lgan majburiyatimizdan faxrlanamiz va faoliyatimizning ekologiyaga salbiy ta'sirini minimallashtirishga harakat qilamiz. Resurslardan samarali foydalanishni oshirish va chiqindilarni kamaytirish uchun ishlab chiqarish jarayonlarimizda innovatsion usullardan va texnologiyalardan faol foydalanamiz. Biz sizga paxta va tekstil sohasida ishonchli hamkoringiz bo'lishni maqsad qilganmiz. Biz yuqori sifatli mahsulotlar, raqobatbardosh narxlar va ishonchli yetkazib berish orqali mijozlarimizning ehtiyojlarini qondirishni maqsad qilamiz.",
				cotton: 'PAKTA',
				tons: 'Yiliga tonna',
				yarn: 'IP',
				fabric: 'KATTA TKIYA',
				woven: "TO'QIMA",
				pieces: 'Million dona',
				product: 'TAYYOR MAHSULOT',
			},
			cn: {
				mainTitle: "'MERGRANTEKS' 的信息",
				title: "欢迎来到 'MERGRANTEKS' - 一个完全垂直整合的纺织公司。",
				paragraph1:
					"专注于高质量产品的生产，并拥有可靠的声誉。我们坚持 '棉花集群经济' 的概念，这涉及到负责地种植棉花和深度加工其成分。",
				paragraph2:
					"我们是一家创新公司，成立于2018年，由两位有远见的兄弟在美丽的布哈拉市创立。我们对纺织品的热情和对质量的承诺是我们成功的驱动力。我们以提供全面集成的棉花和纺织品生产而自豪，从种植优质棉花到最终产品。我们的公司是布哈拉地区领先的棉花加工 '集群' 之一，结合了纺织工业中的各个生产和供应环节。我们高兴地提供广泛的产品，包括棉花纤维、高质量的面料、时尚的纺织品和原创服装。我们有才华的设计师和经验丰富的生产专家团队努力工作，创造符合最高质量和风格标准的产品。我们为我们的环境责任感感到自豪，并努力将我们的活动对生态的负面影响降到最低。我们积极在生产过程中应用创新的方法和技术，以减少废物并提高资源效率。我们的目标是成为您在棉花和纺织品领域的可靠合作伙伴。我们旨在通过提供高质量的产品、竞争力的价格和可靠的交付来满足客户的需求。",
				cotton: '棉花',
				tons: '每年吨数',
				yarn: '纱线',
				fabric: '针织面料',
				woven: '编织面料',
				pieces: '百万件',
				product: '成品',
			},
			ru: {
				mainTitle: "Информация о 'MERGRANTEKS'",
				title:
					"Добро пожаловать в 'MERGRANTEKS' - полностью вертикально интегрированную текстильную компанию.",
				paragraph1:
					"Специализируясь на производстве высококачественной продукции и имея надежную репутацию. Мы придерживаемся концепции 'Экономики хлопкового кластера', которая включает в себя ответственное выращивание хлопка и глубокую переработку его компонентов.",
				paragraph2:
					"Мы инновационная компания, основанная в 2018 году двумя предприимчивыми братьями в прекрасном городе Бухара. Наша страсть к текстилю и приверженность качеству стали движущими силами нашего успеха. Мы гордимся тем, что предлагаем полностью интегрированное производство хлопка и текстиля, от выращивания высококачественного хлопка до готовой продукции. Наша компания является одним из ведущих 'кластеров' по переработке хлопка в Бухарской области, объединяющим различные стадии производства и поставок в текстильной промышленности. Мы рады предложить широкий ассортимент продукции, включая хлопковые волокна, высококачественные ткани, модные текстильные изделия и оригинальную одежду. Наша команда талантливых дизайнеров и опытных специалистов по производству трудится усердно и креативно, чтобы создавать продукты, соответствующие самым высоким стандартам качества и стиля. Мы гордимся нашей приверженностью экологической ответственности и стремимся минимизировать негативное воздействие нашей деятельности на экологию. Мы активно применяем инновационные методы и технологии в наших производственных процессах, чтобы сократить отходы и повысить эффективность использования ресурсов. Наша цель - быть вашим надежным партнером в области хлопка и текстиля. Мы стремимся удовлетворить потребности наших клиентов, предлагая высококачественную продукцию, конкурентные цены и надежную доставку.",
				cotton: 'ХЛОПОК',
				tons: 'Тонны в год',
				yarn: 'ПРЯЖА',
				fabric: 'ТКАНЬ',
				woven: 'ПЛЕТЁНАЯ ТКАНЬ',
				pieces: 'Миллион штук',
				product: 'ГОТОВАЯ ПРОДУКЦИЯ',
			},
		}),
		[]
	)
	const data = [
		{
			label: aboutPage[locale]?.cotton,
			value: '40,000',
			unit: aboutPage[locale]?.tons,
		},
		{
			label: aboutPage[locale]?.yarn,
			value: '9,400',
			unit: aboutPage[locale]?.tons,
		},
		{
			label: aboutPage[locale]?.fabric,
			value: '8,400',
			unit: aboutPage[locale]?.tons,
		},
		{
			label: aboutPage[locale]?.woven,
			value: '4',
			unit: aboutPage[locale]?.pieces,
		},
		{
			label: aboutPage[locale]?.product,
			value: '7',
			unit: aboutPage[locale]?.pieces,
		},
	]

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
					<TextMotion>
						<h1 className='text-4xl container px-3 mx-auto py-10 font-bold'>
							{aboutPage[locale]?.mainTitle}
						</h1>
					</TextMotion>
				</div>
			</div>
			<div className='container px-3 mx-auto'>
				{/* Info text */}
				<motion.div
					initial={{ opacity: 0, x: '-100%' }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='grid lg:grid-cols-3 gap-5 py-10'>
						<div className='lg:col-span-1'>
							<h2 className='text-3xl font-bold pb-4'>
								{aboutPage[locale]?.title}
							</h2>
							<p>{aboutPage[locale]?.paragraph1}</p>
						</div>
						<p className='lg:col-span-2'>{aboutPage[locale]?.paragraph2}</p>
					</div>
				</motion.div>
				{/* Youtube */}
				<div className='grid lg:grid-cols-2 lg:grid-rows-[400px] grid-rows-[repeat(2,400px)] py-10 gap-3'>
					<motion.iframe
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 1 * 0.1 }}
						className='w-full h-full rounded-lg'
						src='https://www.youtube.com/embed/HXyyzWVz5fY'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen='allowfullscreen'
					></motion.iframe>
					<motion.iframe
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 2 * 0.1 }}
						className='w-full h-full rounded-lg'
						src='https://www.youtube.com/embed/HXyyzWVz5fY'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen='allowfullscreen'
					></motion.iframe>
				</div>
				{/* Statistic */}
				<motion.div
					initial={{ opacity: 0, y: '-100%' }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='grid gap-5 py-10 lg:grid-cols-5 sm:grid-cols-3 place-content-center sm:text-start text-center'
				>
					{data.map((item, index) => (
						<CardMotion index={index} key={index}>
							<p className='text-[12px]'>{item.label}</p>
							<span className='text-6xl font-medium'>{item.value}</span>
							<p className='text-[18px] font-medium'>{item.unit}</p>
						</CardMotion>
					))}
				</motion.div>
			</div>
		</div>
	)
}

export default AboutPage
