'use client'

import chine from '@/public/flags/chine.png'
import russian from '@/public/flags/russian.png'
import usa from '@/public/flags/usa.png'
import uzbek from '@/public/flags/uzbek.png'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const Lang = ({ isBlack = false }) => {
	const pathname = usePathname().split('/')[2]
	const localActive = useLocale()
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	const changeLang = nextLocale => {
		router.replace(`/${nextLocale}/${pathname ?? ''}`)
		setIsOpen(false)
	}

	const languages = [
		{ code: 'ru', label: 'Русский', flag: russian },
		{ code: 'en', label: 'English', flag: usa },
		{ code: 'uz', label: 'Uzbek', flag: uzbek },
		{ code: 'cn', label: '中文', flag: chine },
	]

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center w-[100px] justify-center py-2 border rounded ${
					isBlack ? 'text-black' : 'text-white'
				}`}
			>
				{languages.find(lang => lang.code === localActive)?.label || 'Language'}
			</button>
			{isOpen && (
				<div className='absolute mt-2 p-[2px] w-full flex flex-col items-start bg-white border rounded shadow'>
					{languages.map(lang => (
						<div
							key={lang.code}
							className='flex items-center w-full py-1 cursor-pointer hover:bg-gray-200 text-black'
							onClick={() => changeLang(lang.code)}
						>
							<Image
								src={lang.flag}
								alt={lang.label}
								width={20}
								height={20}
								className='mr-1'
							/>
							{lang.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Lang
