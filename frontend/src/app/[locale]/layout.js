import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { Providers } from './providers'
import './globals.css'
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata = {
	title: 'Mergantex',
	description: 'Generated by create next app',
}

export default async function LocaleLayout({ children, params: { locale } }) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
