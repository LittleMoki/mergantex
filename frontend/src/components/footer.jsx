'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { FaTelegram, FaYoutube } from 'react-icons/fa'
import { IoLogoWechat } from 'react-icons/io5'
import logo from '../public/MerganteksLogo.png'

export const Footer = () => {
	const { locale } = useParams() || {}
	const footer = useMemo(
		() => ({
			ru: {
				title:
					'Качество – это основа, на которой держатся каждая нить, каждый шаг и каждое достижение нашей компании.',
				contact: 'Контакты',
				social: 'Соц сети',
			},
			en: {
				title:
					'Quality is the foundation on which every thread, every step, and every achievement of our company stands.',
				contact: 'Contacts',
				social: 'Social networks',
			},
			uz: {
				title:
					'Sifat – kompaniyamizning har bir ipi, har bir qadami va har bir yutugʻining asosi.',
				contact: 'Aloqalar',
				social: 'Ijtimoiy tarmoqlar',
			},
			cn: {
				title: '质量是支撑我们公司每一根线、每一步和每一项成就的基础。',
				contact: '联系方式',
				social: '社交网络',
			},
		}),
		[]
	)

	return (
		<footer id='contact' className='bg-[rgba(0,51,102,100)] py-10 font-arimo'>
			<div className='container mx-auto px-3'>
				<div className='grid justify-items-center sm:grid-cols-3 grid-cols-1 sm:text-start text-center gap-5'>
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
						<h3 className='text-white/30 font-semibold pb-3'>
							{footer[locale]?.social}
						</h3>
						<p className='pb-2'>{footer[locale]?.title}</p>
						<div className='flex gap-4 sm:justify-start justify-center'>
							<a
								target='_blank'
								href='https://www.youtube.com/@gulchekhrashoykulova7251'
							>
								<FaYoutube className='w-[30px] h-[30px]' />
							</a>
							<a target='_blank' href='https://t.me/merganteks'>
								<FaTelegram className='w-[30px] h-[30px]' />
							</a>
							<a
								target='_blank'
								href='https://u.wechat.com/kMZd7_etu2RYNZy0u59GU0A'
							>
								<IoLogoWechat className='w-[30px] h-[30px]' />
							</a>
						</div>
					</ul>
					<ul className='text-white/65'>
						<h3 className='text-white/30 font-semibold pb-3'>
							{footer[locale]?.contact}
						</h3>
						<div className='flex flex-col gap-2'>
							<li>
								200100 Uzbekistan
								<br /> Bukhara City Qarshi
								<br /> Darvoza street 1
							</li>
							<li className='flex flex-col'>
								<a href='tel:+998914000184'>Tel: +998914000184</a>
								<a href='tel:+998907110030'>Tel: +998907110030</a>
								<a href='tel:+998907104744'>Tel: +998907104744</a>
							</li>
							<li>
								<a href='mailto:mergantex@mail.ru'>E-mail: mergantex@mail.ru</a>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</footer>
	)
}
