'use client'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Lang from '@/ui/lang'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import logo from '../public/MerganteksLogo.png'
export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const t = useTranslations('Header')
	const menuItems = [t('home'), t('about'), t('place'), t('technique'), t('contact')]
	const { locale } = useParams()

	return (
		<Navbar
			className='text-white bg-[rgba(0,51,102,100)]'
			maxWidth='xl'
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent justify='start'>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<div className='max-[640px]:w-full h-[50px]'>
						<Link href='/'>
							<Image
								className='w-full h-full object-contain'
								src={logo.src}
								width={logo.width}
								height={logo.height}
								placeholder='blur'
								alt='logo'
								blurDataURL={logo.blurDataURL}
							/>
						</Link>
					</div>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem>
					<Link href='/'>{t('home')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href={`/${locale}/about`}>{t('about')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href={`/${locale}/categories`}>{t('products')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#place'>{t('place')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href={`/${locale}/technique`}>{t('technique')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#contact'>{t('contact')}</Link>
				</NavbarItem>
				<NavbarItem>
					<Lang />
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className='text-xl w-full  text-bold'
							href={`${
								item == 'About'
									? '/' + locale + '/' + item.toLowerCase()
									: item == 'Home'
									? '/'
									: '#' + item.toLowerCase()
							}`}
							size='lg'
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
				<NavbarMenuItem>
					<Link
						className='text-xl w-full  text-bold'
						href={`/${locale}/categories`}
					>
						{t('products')}
					</Link>
				</NavbarMenuItem>

				<NavbarMenuItem>
					<Lang isBlack={true}/>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	)
}
