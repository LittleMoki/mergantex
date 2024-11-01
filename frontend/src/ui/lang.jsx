import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

const Lang = ({ isBlack = false }) => {
	const pathname = usePathname().split('/')[2]
	const localActive = useLocale()
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const changeLang = e => {
		const nextLocal = e.target.value

		startTransition(() => {
			router.replace(`/${nextLocal}/${pathname ?? ''}`)
		})
	}
	return (
		<select
			defaultValue={localActive}
			onChange={changeLang}
			disabled={isPending}
			className={`bg-transparent ${isBlack ? 'text-black' : 'text-white'}`}
		>
			<option className='text-black' value='ru'>
				Русский
			</option>
			<option className='text-black' value='en'>
				English
			</option>
			<option className='text-black' value='uz'>
				Uzbek
			</option>
			<option className='text-black' value='cn'>
				中文
			</option>
		</select>
	)
}

export default Lang
