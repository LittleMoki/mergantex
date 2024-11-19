'use client'
import Hero from '@/module/hero'
import CardMotion from '@/ui/cardMotion'
import TextMotion from '@/ui/textMotion'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
const AboutPage = () => {
	const { locale } = useParams() || {}
	const aboutPage = useMemo(
		() => ({
			en: {
				mainTitle: "Information about 'MERGRANTEKS'",
				title:
					'Merganteks LLC was established in 1993 in the beautiful city of Uzbekistan, Bukhara',
				paragraph1:
					'Since the establishment of our company, we have guaranteed absolute customer satisfaction, provided best quality, and grasped trade goals with principles. Our passion for textiles and commitment to quality have been the driving forces behind our success. We take pride in offering fully integrated cotton and textile production, from growing high-quality cotton to the final products.',
				paragraph2:
					"Our company is one of the leading cotton processing clusters in the Bukhara region, uniting various stages of production and supply in the textile industry. Today, 4 of our factories are operating. Merganteks cotton-textile cluster located in Karakul district of Bukhara region, 2 spinning factories located in Alat district of Bukhara region, Weaving, Dyeing, Printing and Sewing factories are in the center of Bukhara region. Our plants and factories are equipped with the equipment and workshops of the world's largest companies. For example, Rieter (Switzerland), Karl Mayer (Germany), Picanol (Belgium), Monforts (Germany), Benninger (Switzerland), Murata and Juki (Japan). These machines help us a lot in producing quality products. Our laboratory is equipped with the latest instruments from Uster Technologies (Switzerland) and James Heal (UK). These advanced devices enable us to conduct daily tests, ensuring that we consistently maintain the highest quality standards in our products.We are pleased to offer a wide range of products, including cotton yarn, high-quality fabrics, fashionable textile goods, and original clothing. Our team of talented designers and experienced production specialists works diligently and creatively to create products that meet the highest standards of quality and style. We are proud of our commitment to environmental responsibility and strive to minimize the negative impact of our activities on ecology. We actively apply innovative methods and technologies in our production processes to reduce waste and improve resource efficiency. Our goal is to be your reliable partner in cotton and textiles. ",
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
					'“Merganteks” MChJ 1993 yilda O‘zbekistonning go‘zal shahri Buxoroda tashkil etilgan.',
				paragraph1:
					"Kompaniyamiz tashkil etilganidan beri biz mijozlarning mutlaq qoniqishini kafolatlab, eng yaxshi sifatni ta'minladik va savdo maqsadlarini tamoyillar asosida qurdik. Toʻqimachilikka boʻlgan ishtiyoqimiz va sifatga boʻlgan sodiqligimiz muvaffaqiyatimiz ortida turgan harakatlantiruvchi kuch boʻldi. Biz yuqori sifatli paxta yetishtirishdan tortib to yakuniy mahsulotgacha to‘liq integratsiyalashgan paxta va to‘qimachilik mahsulotlarini taklif qilishdan faxrlanamiz.",
				paragraph2:
					"Korxonamiz to‘qimachilik sanoatida ishlab chiqarish va yetkazib berishning turli bosqichlarini birlashtirgan Buxoro viloyatidagi paxtani qayta ishlash bo‘yicha yetakchi klasterlardan biri hisoblanadi. Bugungi kunda 4 ta zavodimiz ishlab turibdi. Buxoro viloyatining Qorako‘l tumanida joylashgan “Merganteks” paxta-to‘qimachilik klasteri, Buxoro viloyatining Olot tumanida joylashgan 2 ta ip yigiruv fabrikasi, Buxoro viloyati markazida to‘qimachilik, bo‘yash, gul bosish va tikuvchilik fabrikalari joylashgan. Zavod va fabrikalarimiz jahondagi eng yirik kompaniyalarning uskunalari bilan jihozlangan. Masalan, Rieter (Shveytsariya), Karl Mayer (Germaniya), Pikanol (Belgiya), Monforts (Germaniya), Benninger (Shveytsariya), Murata va Juki (Yaponiya). Bu mashinalar bizga sifatli mahsulot ishlab chiqarishda katta yordam beradi. Laboratoriyamiz Uster Technologies (Shveytsariya) va Jeyms Heal (Buyuk Britaniya) kompaniyalarining eng yangi uskunalari bilan jihozlangan. Ushbu ilg'or qurilmalar bizga kundalik sinovlarni o'tkazib, mahsulotlarimizdagi eng yuqori sifat standartlarini doimiy ravishda saqlab turishimizni ta'minlash imkonini beradi.Biz mahsulotlarning keng assortimentini taklif qilishdan mamnunmiz, jumladan, paxta iplari, yuqori sifatli matolar, moda to'qimachilik mahsulotlari va original kiyimlar. Bizning iste'dodli dizaynerlar va tajribali ishlab chiqarish mutaxassislarimizdan iborat jamoamiz sifat va uslubning eng yuqori standartlariga javob beradigan mahsulotlarni yaratish uchun astoydil va ijodiy ishlaydi. Biz ekologik mas'uliyatga sodiqligimizdan faxrlanamiz va faoliyatimizning ekologiyaga salbiy ta'sirini minimallashtirishga intilamiz. Biz ishlab chiqarish jarayonlarida chiqindilarni kamaytirish va resurslar samaradorligini oshirish uchun innovatsion usullar va texnologiyalarni faol qo'llaymiz. Bizning maqsadimiz paxta va to‘qimachilik sohasida sizning ishonchli hamkoringiz bo‘lishdir.",
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
				title: 'Merganteks LLC 于 1993 年在乌兹别克斯坦美丽的城市布哈拉成立',
				paragraph1:
					'自公司成立以来，我们保证绝对的客户满意度，提供最佳质量，并坚持原则地把握贸易目标。我们对纺织品的热情和对质量的承诺一直是我们成功的驱动力。我们以提供完全集成的棉花和纺织品生产而自豪，从种植优质棉花到最终产品',
				paragraph2:
					'我们公司是布哈拉地区领先的棉花加工集群之一，将纺织行业的各个生产和供应阶段结合在一起。今天，我们有 4 家工厂正在运营。Merganteks 棉纺织集群位于布哈拉地区的卡拉库尔区，2 家纺纱厂位于布哈拉地区的阿拉特区，织造、染色、印花和缝纫厂位于布哈拉地区的中心。我们的工厂配备了世界上最大的公司的设备和车间。例如，Rieter（瑞士）、Karl Mayer（德国）、Picanol（比利时）、Monforts（德国）、Benninger（瑞士）、Murata 和 Juki（日本）。这些机器对我们生产优质产品有很大帮助。我们的实验室配备了 Uster Technologies（瑞士）和 James Heal（英国）的最新仪器。这些先进的设备使我们能够进行日常测试，确保我们始终保持产品的最高质量标准。我们很高兴提供广泛的产品，包括棉纱、优质面料、时尚纺织品和原创服装。我们才华横溢的设计师和经验丰富的生产专家团队勤奋而富有创造力地工作，创造出符合最高质量和风格标准的产品。我们为我们对环境责任的承诺感到自豪，并努力将我们的活动对生态的负面影响降至最低。我们在生产过程中积极应用创新方法和技术，以减少浪费并提高资源效率。我们的目标是成为您在棉花和纺织品方面的可靠合作伙伴。',
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
					'ООО «Merganteks» было основано в 1993 году в прекрасном городе Узбекистана, Бухаре.',
				paragraph1:
					'С момента основания нашей компании мы гарантировали абсолютное удовлетворение клиентов, обеспечивали лучшее качество и ставили торговые цели на принципах. Наша страсть к текстилю и приверженность качеству были движущими силами нашего успеха. Мы гордимся тем, что предлагаем полностью интегрированное хлопковое и текстильное производство, от выращивания высококачественного хлопка до конечной продукции.',
				paragraph2:
					'Наша компания является одним из ведущих кластеров по переработке хлопка в Бухарской области, объединяющим различные этапы производства и поставок в текстильной промышленности. В сегодняшние дни работают 4 наших завода. Хлопково-текстильный кластер «Merganteks» расположен в Каракульском районе Бухарской области, 2 прядильные фабрики расположены в Алатском районе Бухарской области, ткацкая, красильная, печатная и швейная фабрики находятся в центре Бухарской области. Наши заводы и фабрики оснащены оборудованием мировых компаний. Например, Rieter (Швейцария), Karl Mayer (Германия), Picanol (Бельгия), Monforts (Германия), Benninger (Швейцария), Murata и Juki (Япония). Эти машины очень помогают нам в производстве качественной продукции. Наша лаборатория оснащена новейшими приборами от Uster Technologies (Швейцария) и James Heal (Великобритания). Эти передовые устройства позволяют нам проводить ежедневные испытания, гарантируя, что мы постоянно поддерживаем самые высокие стандарты качества нашей продукции. Мы рады предложить широкий ассортимент продукции, включая хлопчатобумажную пряжу, высококачественные ткани, модные текстильные изделия и оригинальную одежду. Наша команда талантливых дизайнеров и опытных специалистов по производству работает усердно и креативно, чтобы создавать продукцию, которая соответствует самым высоким стандартам качества и стиля. Мы гордимся своей приверженностью экологической ответственности и стремимся минимизировать негативное влияние нашей деятельности на экологию. Мы активно применяем инновационные методы и технологии в наших производственных процессах для сокращения отходов и повышения эффективности использования ресурсов. Наша цель — быть вашим надежным партнером в области хлопка и текстиля.',
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
				<Hero />
				<div className='absolute w-full z-20 backdrop-blur-lg bottom-0 left-0 text-white'>
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
							<span className='text-[42px] font-medium'>{item.value}</span>
							<p className='text-[18px] font-medium'>{item.unit}</p>
						</CardMotion>
					))}
				</motion.div>
			</div>
		</div>
	)
}

export default AboutPage
