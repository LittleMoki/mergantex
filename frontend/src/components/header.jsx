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
import { useState } from 'react'
import logo from '../public/MerganteksLogo.png'
export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const menuItems = [
		'Home',
		'About',
		'Products',
		'Place',
		'Technique',
		'Contact',
	]
	const { locale } = useParams()
	return (
		<Navbar
			className='text-white bg-blue-950'
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
					<Link href='/'>Home</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href={`/${locale}/about`}>About</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#products'>Products</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#place'>Place</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#technique'>Technique</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href='#contact'>Contact</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu className='text-white'>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className='w-full'
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
			</NavbarMenu>
		</Navbar>
	)
}
