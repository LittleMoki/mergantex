import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

const Lang = () => {
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
			className='bg-transparent text-white'
		>
			<option className='text-black' value='ru'>
				Russian
			</option>
			<option className='text-black' value='en'>
				English
			</option>
			<option className='text-black' value='uz'>
				Uzbek
			</option>
		</select>
	)
}

export default Lang
